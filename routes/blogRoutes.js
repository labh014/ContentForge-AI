const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");


router.post("/", async (req, res) => {
    try {
        const { title, url, content, author } = req.body;


        if (!title || !url) {
            return res.status(400).json({ error: "Title and URL are required" });
        }

        const newBlog = new Blog({
            title,
            url,
            content,
            author
        });

        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);

    }
    catch (err) {
        res.status(500).json({ error: "Failed to create blog", details: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    }
    catch (err) {
        res.status(500).json({ error: "Could not fetch blogs" });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: "Error fetching blog" });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.json(updatedBlog);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update blog" });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

        if (!deletedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.json({ message: "Blog deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete blog" });
    }
});

module.exports = router;
