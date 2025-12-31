const searchGoogle = require("./services/googleSearch");
const scrapeArticle = require("./services/scrapeArticle");

async function run() {
    console.log("Starting Automation Pipeline...");

    const links = await searchGoogle("AI Customer Support");

    for (let link of links) {
        const text = await scrapeArticle(link);

        if (text) {
            console.log(`Extracted Content (${text.length} chars):`);

            
            console.log(text.slice(0, 200) + "...");
            console.log("-".repeat(50));
        }
    }
}

run();
