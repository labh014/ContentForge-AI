require("dotenv").config();

module.exports = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    BACKEND_API: process.env.BACKEND_API || "http://localhost:3000/api/articles"
};
