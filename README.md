# 📢 NEWS_PORTAL

A simple **News Portal Web Application** built using **HTML, CSS, and JavaScript** with a **JSON-Server backend**.  
This project allows authenticated users to create, view, edit, delete, and comment on news articles.

---

## 🚀 Features

- 🔐 User Authentication (Demo Users Included)
- 📰 Create, Read, Update, Delete (CRUD) News Articles
- 💬 Comment on News Articles
- 📱 Responsive and User-Friendly Interface
- 🗄️ Backend simulated using JSON-Server

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript 
- JSON-Server
- Node.js

---

## 📦 Installation

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Farhana-Faruque/NEWS_PORTAL.git
```

### 2️⃣ Navigate to the Project Directory

```bash
cd NEWS_PORTAL
```

### 3️⃣ Install Dependencies

```bash
npm install
```

---

## ▶️ Run the Application

Start the JSON Server:

```bash
npm start
```

By default, the server will run on:

```
http://localhost:3000
```

---

## 🌐 How to Use

1. Make sure JSON-Server is running.
2. Open your browser.
3. Open `index.html` or visit:

```
http://localhost:3000/index.html
```

4. Log in using a demo user.
5. Start managing news articles!

---

## 👥 Demo Users

You can log in using the following test users:

| Name           | Email                |
|----------------|----------------------|
| Kazi           | kazi@example.com    |
| Farhana        | farhana@example.com    |
| Faruque        | faruque@example.com   |

> Note: Password authentication may depend on implementation.

---

## 📁 Project Structure

```
NEWS_PORTAL/
│
├── backend/
├── frontend/
├── index.html
├── login.html
├── news-list.html
├── news-detail.html
├── create-news.html
├── edit-news.html
├── app.js
├── styles.css
├── db.json
└── package.json
```

### 📌 File Descriptions

- `index.html` – Landing page
- `login.html` – User login page
- `news-list.html` – Displays all news articles
- `news-detail.html` – Detailed news view with comments
- `create-news.html` – Add new article
- `edit-news.html` – Edit existing article
- `app.js` – Main application logic
- `styles.css` – Styling file
- `db.json` – Mock database for JSON-Server

---

## 🔗 API Endpoints

| Method | Endpoint        | Description              |
|--------|----------------|--------------------------|
| GET    | /users         | Get all users            |
| GET    | /news          | Get all news articles    |
| GET    | /news/:id      | Get single news article  |
| POST   | /news          | Create news article      |
| PUT    | /news/:id      | Update news article      |
| DELETE | /news/:id      | Delete news article      |

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

