import {JSDOM} from 'jsdom'

function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
    console.log(urlObj)
    let pathName = urlObj.pathname
    if (pathName.slice(-1) === "/") {
        pathName = pathName.slice(0, pathName.length - 1)
    }
    const search = urlObj.search
    const hash = urlObj.hash
    let base = urlObj.hostname
    if (base.startsWith("www.")) {
        base = base.slice(4);
    }
    const normalizedURL = base + pathName + search + hash
    console.log(normalizedURL)
    return normalizedURL.toLowerCase()
}

function getURLsFromHTML(htmlBody, baseURL) {
    const html_dom = new JSDOM(htmlBody);
    console.log(`This is the html content ${htmlBody}`);
    const link_nodes = html_dom.window.document.querySelectorAll('a')
    const all_links = []
    for (const node of link_nodes) {
        const link = node.href
        console.log(link)
        if (link.startsWith("/")) {
            all_links.push(`${baseURL}${link}`)
        } else {
            all_links.push(link.slice(0, link.length - 1))
        }
    }
    console.log(all_links)
    return all_links
}

async function getURLContent(currentURL) {
    let response
    console.log('Getting URL content...')
    console.log(`This is the currentURL: ${currentURL}`)
    try {
        response = await fetch(currentURL);
        console.log(response.status);    
    } catch (error) {
        console.log(`Got an error: ${error.message}`);
        return
    }
    if (response.status >= 400){
        console.log(Error(response.statusText))
        return
    } else if (response.headers.get("content-type").split(";")[0] != "text/html") {
        console.log(response.headers.get("content-type"));
        console.log(Error("Incorrect content type. Needs to be text/html"));
        return
    }
    const content = await response.text()
    return content
}

async function crawlPage(baseURL, currentURL=baseURL, pages={}) {
    const baseURLObj = new URL(baseURL);
    console.log(`Crawling this URL next: ${currentURL}`)
    const currentURLObj = new URL(currentURL);
    if (currentURLObj.hostname != baseURLObj.hostname) {
        return pages
    }
    const normalizedCurrentURL = normalizeURL(currentURL)
    if (normalizedCurrentURL in pages) {
        pages[normalizedCurrentURL] ++
        return pages
    } else {
        pages[normalizedCurrentURL] = 1
    }
    const currentURLBody = await getURLContent(currentURL);
    const listOfURLs = getURLsFromHTML(currentURLBody, baseURL);
    console.log(`This is the current list of URLS : ${listOfURLs}`)
    for (const url of listOfURLs) {
        pages = crawlPage(baseURL, url, pages)
    }
    console.log(pages)
    return pages

}

export { normalizeURL, getURLsFromHTML, crawlPage };
