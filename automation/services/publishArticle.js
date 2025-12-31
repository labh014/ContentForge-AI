const axios = require("axios");
const env = require("../config/env");

async function publishArticle(article) {
    try {
        console.log(`Posting to ${env.BACKEND_API}...`);
        await axios.post(env.BACKEND_API, article);
    } 
    
    catch (err) {
        console.error("Failed to publish article:");
        console.error(`URL: ${env.BACKEND_API}`);
        if (err.response) {
            console.error(`Status: ${err.response.status}`);
            console.error(`Status Text: ${err.response.statusText}`);
        } else {
            console.error(err.message);
        }
        throw err;
    }
}

module.exports = publishArticle;
