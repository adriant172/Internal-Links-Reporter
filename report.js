function sort(array){
    let swapping = true;
    let end = sortedPages.length;
    while (swapping) {
        swapping = false;
        for ( let i = 1; i < sortedPages.length; i++) {
            if (sortedPages[i - 1][1] < sortedPages[i][1]) {
                sortedPages[i-1], sortedPages[i] = sortedPages[i], sortedPages[i-1]
                swapping = true;
            }
        }
    }
    
}

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
    // console.log(sortedPages);
    sortedPages.forEach( page => {
        const url = page[0];
        const count = page[1];
        console.log(`Found ${count} internal links to ${url}`)
    });
}

export {printReport}