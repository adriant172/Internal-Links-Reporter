import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";


test('with https and ending /', () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
})

test('with https', () => {
    expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path")
})

test('with http and ending /', () => {
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
})
test('with http', () => {
    expect(normalizeURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path")
})
test('with capital letters', () => {
    expect(normalizeURL("http://BLOG.boot.dev/path")).toBe("blog.boot.dev/path")
})
test('with http and www. prefix', () => {
    expect(normalizeURL("http://www.blog.boot.dev/path")).toBe("blog.boot.dev/path")
})

test('with https and www. prefix', () => {
    expect(normalizeURL("https://www.blog.boot.dev/path")).toBe("blog.boot.dev/path")
})

test('query parameters with http', () => {
    expect(normalizeURL("http://blog.boot.dev/path?param1=value1&param2=value2")).toBe("blog.boot.dev/path?param1=value1&param2=value2")
})

test('query parameters with https', () => {
    expect(normalizeURL("https://blog.boot.dev/path?param1=value1&param2=value2")).toBe("blog.boot.dev/path?param1=value1&param2=value2")
})

test('section with http', () => {
    expect(normalizeURL("http://blog.boot.dev/path#section1")).toBe("blog.boot.dev/path#section1")
})

test('section with https', () => {
    expect(normalizeURL("https://blog.boot.dev/path#section1")).toBe("blog.boot.dev/path#section1")
})


test('with two simple absolute URLs', () => {
    expect(getURLsFromHTML(`<html>
        <body>
            <a href='https://blog.boot.dev'><span>Go to Boot.dev</span></a>
            <a href='https://news.boot.dev'><span>Go to Boot.dev</span></a>
        </body>
    </html>`
    , "https://blog.boot.dev")).toEqual(["https://blog.boot.dev","https://news.boot.dev"])
})
test('with an additional relative URL', () => {
    expect(getURLsFromHTML(`<html>
        <body>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            <a href="https://news.boot.dev"><span>Go to news section</span></a>
            <a href="/test.html"><span>Relative url test</span></a>   
        </body>
    </html>`
    , "https://blog.boot.dev")).toEqual(["https://blog.boot.dev","https://news.boot.dev", "https://blog.boot.dev/test.html"])
})
test(' with a nested anchor tag', () => {
    expect(getURLsFromHTML(`<html>
        <body>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            <a href="https://news.boot.dev"><span>Go to news section</span></a>
            <div>
                <div>
                    <a href="https://test.dev"><span>Go to fake site</span></a>
                </div>
            </div>
        </body>
    </html>`
    , "https://blog.boot.dev")).toEqual(['https://blog.boot.dev','https://news.boot.dev', 'https://test.dev'])
})