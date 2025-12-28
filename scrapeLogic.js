const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeOldestBlogs() {
    const url = "https://beyondchats.com/post-sitemap.xml";

    try {
        
        const res = await axios.get(url);
        const $ = cheerio.load(res.data, { xmlMode: true });

        let blogs = [];

        let urls = $("url");

        for (let i = 0; i < urls.length; i++) {
            let blogUrl = $(urls[i]).find("loc").text();
            let lastModified = $(urls[i]).find("lastmod").text();

            if (blogUrl && lastModified) {
                blogs.push({
                    url: blogUrl,
                    date: new Date(lastModified)
                });
            }
        }

        blogs.sort((a, b) => a.date - b.date);

        let reqBlogs = blogs.slice(0, 10);

        console.log("Oldest 10 blogs:");

        reqBlogs.forEach((blog, index) => {
            console.log(
                `${index + 1}. ${blog.date.toISOString()} - ${blog.url}`
            );
        });

        return reqBlogs;
    } catch (err) {
        console.log("Error while scraping sitemap");
    }
}

scrapeOldestBlogs();
