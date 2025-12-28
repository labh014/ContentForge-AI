const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const connectDB = require("./db");
const Blog = require("./models/Blog");

async function scrapeBlogDetails(url) {
    try {
        const res = await axios.get(url, {
            headers: { "User-Agent": "Mozilla/5.0" },
        });

        const $ = cheerio.load(res.data);

        const title = $("h1").first().text().trim();
        const content = $(".blog-content").text().trim() || $("body").text().substring(0, 200) + "...";
        const author = $(".author").text().trim() || "Unknown";
        const dateText = $(".post-date").text().trim();

        return {
            title: title || "No Title Found",
            url,
            content,
            author,
            publishedDate: dateText ? new Date(dateText) : new Date(),
        };

    } 
    
    catch (err) {
        console.error(`Failed to scrape details for ${url}: ${err.message}`);
        return null;
    }
}

async function saveBlog(blogData) {
    if (!blogData) return;

    await Blog.updateOne(
        { url: blogData.url },
        { $setOnInsert: blogData },
        { upsert: true }
    );
}

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
