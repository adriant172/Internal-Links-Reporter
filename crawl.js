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
    const html_dom = new JSDOM(htmlBody)
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

async function crawlPage(currentURL) {
    let response
    try {
        response = await fetch(currentURL)
        console.log(response.status)    
    } catch (error) {
        throw new Error(error.message)
    }
    if (response.status >= 400){
        throw new Error(response.statusText)
    } else if (response.headers.get("content-type").split(";")[0] != "text/html") {
        console.log(response.headers.get("content-type"))
        throw new Error("Incorrect content type. Needs to be text/html")
    }
    console.log(await response.text())
}

export { normalizeURL, getURLsFromHTML, crawlPage };
