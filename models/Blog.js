const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true,
            unique: true
        },
        content: String,
        author: String,
        publishedDate: Date,
        scrapedAt: {
            type: Date,
            default: Date.now
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
