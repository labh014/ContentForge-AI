const searchGoogle = require("./services/googleSearch");
const scrapeArticle = require("./services/scrapeArticle");
const enhanceContent = require("./services/llmEnhance");
const publishArticle = require("./services/publishArticle");

async function run() {
    const title = "AI in Customer Support";
    console.log(`Starting Automation Pipeline for: "${title}"`);

    const links = await searchGoogle(title);

    console.log(`Found ${links.length} sources. Processing each individually...`);

    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        console.log(`Processing [${i + 1}/${links.length}]: ${link}`);

        console.log(`Scraping content...`);
        const scrapedData = await scrapeArticle(link);

        if (!scrapedData || !scrapedData.content || scrapedData.content.length === 0) {
            console.log(`Skipped empty content from ${link}`);
            continue;
        }

        console.log(`Title Found: "${scrapedData.title}"`);

        console.log(`Enhancing content with Gemini...`);
        const finalContent = await enhanceContent(scrapedData.content, [link]);

        console.log(`Publishing article to backend...`);
        await publishArticle({
            title: scrapedData.title,
            url: `https://example.com/generated/${Date.now()}_${i}`,
            content: finalContent,
            author: "Gemini Bot",
            references: [link]
        });

        console.log(`Article ${i + 1} processed successfully`);
    }

    console.log("All articles processed");
}

run();

