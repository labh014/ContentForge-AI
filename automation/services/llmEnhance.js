const { GoogleGenerativeAI } = require("@google/generative-ai");
const env = require("../config/env");

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function enhanceContent(content, refs) {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
Rewrite this content in a professional blog style.
Avoid random stuff and make it more engaging and also avoid plagiarism.
Improve structure and clarity.
Add references at the bottom.

CONTENT:
${content}

REFERENCES:
${refs.join("\n")}
`;

    const maxRetries = 3;
    for (let i = 0; i < maxRetries; i++) {
        try {
            const result = await model.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            const isRateLimit = error.message.includes("429") || error.message.includes("Quota") || error.message.includes("quota");

            if (isRateLimit && i < maxRetries - 1) {
                const waitTime = (i + 1) * 20000;
                console.log(`Rate limit hit. Waiting ${waitTime / 1000}s before retry ${i + 1}/${maxRetries}...`);
                await sleep(waitTime);
                continue;
            }

            console.error("Gemini API Error:", error.message);
            if (i === maxRetries - 1) return "Content generation failed due to API rate limits.";
        }
    }
}

module.exports = enhanceContent;
