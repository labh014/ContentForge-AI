# ContentForge AI

A simple automation tool that scrapes blog posts, rewrites them using Google Gemini AI, and publishes them to a Mongo database.

## Tech Stack
- **Node.js**: The runtime environment.
- **Express.js**: Backend API server.
- **MongoDB**: Database to store articles.
- **Google Gemini**: AI model for rewriting content.
- **Cheerio**: Tool for scraping web pages.

## How to Run

### 1. Setup
Install the dependencies:

npm install

Make sure your `.env` file has these keys:
```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_api_key
BACKEND_API=http://localhost:3000/api/articles  # or your Render URL
```

### 2. Run the Server (Backend)
This starts the API that listens for new articles and saves them to the database.

npm run dev

_Keep this running in one terminal._

### 3. Run the Automation
This script searches Google, scrapes blogs, enhances them with AI, and sends them to your server.

node automation/index.js


## Project Structure
- `src/server.js`: Main backend server.
- `automation/index.js`: The script that runs the whole automation process.
- `models/Blog.js`: Database schema for articles.
