import {JSDOM} from 'jsdom'

function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
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
    return normalizedURL.toLowerCase()
}

function getURLsFromHTML(htmlBody, baseURL) {
    const html_dom = new JSDOM(htmlBody);
    const link_nodes = html_dom.window.document.querySelectorAll('a')
    const all_links = []
    for (const node of link_nodes) {
        const link = node.href
        if (link.startsWith("/")) {
            all_links.push(`${baseURL}${link}`)
        } else {
            all_links.push(link.slice(0, link.length - 1))
        }
    }
    return all_links
}

async function getURLContent(currentURL) {
    let response
    try {
        response = await fetch(currentURL);
    } catch (error) {
        console.log(`Got an error: ${error.message}`);
        return null
    }
    if (response.status >= 400){
        console.log(response.statusText)
        return null
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || contentType.split(";")[0] != "text/html") {
        console.log("Incorrect content type. Needs to be text/html");
        return null
    }
    const content = await response.text()
    return content
}

async function crawlPage(baseURL, currentURL=baseURL, pages={}) {
    const baseURLObj = new URL(baseURL);
    let currentURLObj
    try {
        currentURLObj = new URL(currentURL);
    } catch (error) {
        console.log(error.message)
    }
    if (!currentURLObj || currentURLObj.hostname != baseURLObj.hostname) {
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
    for (const url of listOfURLs) {
        pages = await crawlPage(baseURL, url, pages)
    }
    return pages

}

export { normalizeURL, getURLsFromHTML, crawlPage };
