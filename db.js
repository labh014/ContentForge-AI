require("dotenv").config();
const mongoose = require("mongoose");


async function main() {
    try {

        const mongoURI = process.env.MONGO_URI;

        await mongoose.connect(mongoURI, {
        });

        console.log("MongoDB connected successfully");
    }

    catch (error) {
        console.error("MongoDB connection occurs error:", error.message);
    }
}

module.exports = main;
