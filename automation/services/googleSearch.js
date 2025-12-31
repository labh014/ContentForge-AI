async function searchGoogle(query) {
    console.log(`Searching Google for: "${query}"...`);

    await new Promise(resolve => setTimeout(resolve, 1000));

    return [
        "https://beyondchats.com/blogs/rule-based-chatbots-vs-ai-chatbots-5-key-differences/",
        "https://www.example.com"
    ];
}

module.exports = searchGoogle;
