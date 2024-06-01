
function insertSort(sortedPages){
    // This function takes an array of 2 element arrays, each containing a site string and a number
    for (let i = 1; i < sortedPages.length; i++) {
        let currentPage = sortedPages[i];
        let lastIndex = i - 1;
        while (lastIndex >= 0 && sortedPages[lastIndex][1] < currentPage[1]) {
            sortedPages[lastIndex + 1] = sortedPages[lastIndex];
            lastIndex--
        }
        sortedPages[lastIndex + 1] = currentPage;
    }
    return sortedPages
}

function printReport(pages){
    console.log("Report is starting....")
    
    let sortedPages = [];
    for (const page of Object.keys(pages) ) {
        sortedPages.push([page, pages[page]])
    }
    sortedPages = insertSort(sortedPages)
    sortedPages.forEach( page => {
        const url = page[0];
        const count = page[1];
        console.log(`Found ${count} internal links to ${url}`)
    });
}

export {printReport}