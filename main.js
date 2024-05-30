import { argv } from 'node:process';
import { crawlPage } from './crawl.js';

function main() {
    const args = argv.slice(2)
    if (args.length < 1) {
        throw new Error("No arguments were provided.")
    } else if (args.length > 1) {
        throw new Error(" Too many arguments were provided.")
    } else {
        console.log(`This is the base URL: ${args[0]}`)
        crawlPage(args[0])
    }
  }
  
  main()
  