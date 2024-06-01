import { argv } from 'node:process';
import { crawlPage } from './crawl.js';
import { printReport } from './report.js';

async function main() {
    const args = argv.slice(2)
    if (args.length < 1) {
        throw new Error("No arguments were provided.")
    } else if (args.length > 1) {
        throw new Error(" Too many arguments were provided.")
    } else {
        console.log(`This is the base URL: ${args[0]}`)
        printReport(await crawlPage(args[0]))

    }
  }
  
  main()
  