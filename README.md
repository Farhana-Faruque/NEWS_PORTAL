# NEWS_PORTAL

A simple news portal application with JSON-Server backend.

## Features
- User authentication
- Create, read, update, and delete news articles
- Comment on news articles
- Responsive design

## Prerequisites
- Node.js installed on your system

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

This will start the JSON-Server on `http://localhost:3000`

### 3. Open the Application
Open your browser and navigate to:
```
http://localhost:3000/index.html
```

Or open the `index.html` file directly in your browser while the server is running.

## Available Users
The application comes with pre-configured test users:
- Alice Rahman (alice@example.com)
- Karim Hossain (karim@example.com)
- Nusrat Jahan (nusrat@example.com)

## Project Structure
- `index.html` - Landing page (redirects to login or news list)
- `login.html` - User login page
- `news-list.html` - Display all news articles
- `news-detail.html` - View individual news article with comments
- `create-news.html` - Create new news article
- `edit-news.html` - Edit existing news article
- `app.js` - Main JavaScript functionality
- `styles.css` - Application styles
- `db.json` - JSON-Server database

## API Endpoints
- GET `/users` - Get all users
- GET `/news` - Get all news articles
- GET `/news/:id` - Get specific news article
- POST `/news` - Create new news article
- PUT `/news/:id` - Update news article
- DELETE `/news/:id` - Delete news article
