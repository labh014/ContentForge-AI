const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeArticle(url) {
    try {
        console.log(`Scraping..............: ${url}`);

        const res = await axios.get(url, {
            headers: { "User-Agent": "Mozilla/5.0" },
            timeout: 5000
        });

        const $ = cheerio.load(res.data);

        const content =
            $("article").text() ||
            $("main").text() ||
            $("body").text();

        return content.replace(/\s+/g, " ").trim();

    } catch (err) {
        console.error(`Failed to scrape ${url}: ${err.message}`);
        return "";
    }
}

module.exports = scrapeArticle;
