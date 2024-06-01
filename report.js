function printReport(pages){
    console.log("Report is starting....")
    
    const sortedPages = [];
    for (const page of Object.keys(pages) ) {
        sortedPages.push([page, pages[page]])
    }
    for (let i = 1; i < sortedPages.length; i++) {
        let currentPage = sortedPages[i];
        let lastIndex = i - 1;
        while (lastIndex >= 0 && sortedPages[lastIndex][1] < currentPage[1]) {
            sortedPages[lastIndex + 1] = sortedPages[lastIndex];
            lastIndex--
        }
        sortedPages[lastIndex + 1] = currentPage;
    }
    sortedPages.forEach( page => {
        const url = page[0];
        const count = page[1];
        console.log(`Found ${count} internal links to ${url}`)
    });
}

export {printReport}