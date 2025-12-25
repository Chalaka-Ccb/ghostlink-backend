# GhostLink 👻

**GhostLink** is a privacy-first secure messaging platform and URL shortener. It allows users to share sensitive information (like passwords or API keys) via "Burn-on-Read" links that permanently self-destruct after one view, or create trackable short URLs for marketing campaigns.

Built with the **MERN Stack** (MongoDB, Express, React, Node.js) and fully containerized with **Docker**.

---

## 🚀 Features

### ✅ Core Functionality (MVP)
* **Burn-After-Reading:** Create encrypted, one-time-use links for sharing secrets. The moment the link is accessed, the data is wiped from the database.
* **URL Shortener:** Convert long, ugly URLs into clean, shareable short links.
* **Expiration Logic:** Links expire automatically based on click count (e.g., 1 view) or time limits.
* **Responsive UI:** A modern, Dark Mode interface built with Tailwind CSS.

### 🔜 Roadmap (Coming Soon)
* **User Authentication:** Sign-up/Login to manage links.
* **Branded URLs:** Create custom aliases (e.g., `ghost.link/my-brand`).
* **Analytics Dashboard:** detailed click tracking, geographic data, and referrer stats for registered users.
* **Link Management:** Edit or delete active links manually.

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite), Tailwind CSS, Axios, React Router
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Cloud) with TTL Indexing
* **DevOps:** Docker, Docker Compose, Nginx (Reverse Proxy)
* **Testing:** Automated Integration Testing (Node.js scripts)

---

## 📂 Project Structure

```bash
GhostLink/
├── docker-compose.yml       # Orchestrates Frontend & Backend containers
├── ghostlink-backend/       # Server Logic
│   ├── src/
│   │   ├── config/          # DB Connection
│   │   ├── controllers/     # Business Logic (Ghosting/Shortening)
│   │   ├── models/          # MongoDB Schema
│   │   └── routes/          # API Endpoints
│   └── Dockerfile           # Backend Container Config
└── ghostlink-frontend/      # Client UI
    ├── src/
    │   ├── components/      # React Components (CreateLink, LandingPage)
    │   └── pages/           # Page Layouts
    └── Dockerfile           # Frontend Container Config
```
## ⚡ Getting Started

You can run GhostLink in two ways: using Docker (recommended) or Locally.

### Prerequisites

Node.js (v18+)
Docker & Docker Compose (for containerized run)
A MongoDB Atlas Connection String

**Option 1**: Run with Docker (Recommended) 🐳
This spins up the entire environment (Frontend + Backend) with one command.

Clone the repository:

```Bash

git clone [https://github.com/yourusername/ghostlink.git](https://github.com/yourusername/ghostlink.git)
cd ghostlink
```
Configure Environment: Create a .env file in the root directory:

```bash

MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000

```
Build and Run:
```
docker-compose up --build
```

**Access the App:**

Frontend: http://localhost
Backend API: http://localhost:5000

**Option 2**: Run Locally (For Development) 💻

1. Backend Setup:

```Bash

cd ghostlink-backend
npm install 
# Create a .env file inside ghostlink-backend with your MONGO_URI
npm run dev
```

2. Frontend Setup:

```Bash

cd ghostlink-frontend
npm install
npm run dev

```
Access the frontend at:-  http://localhost:5173.

## 🧪 Testing

This project includes an automated integration test suite to verify the critical "Ghost" logic (ensuring data is actually deleted after reading).

#### To run the tests:

```Bash

cd ghostlink-backend
node test-api.js

```


**Test Coverage:**

✅ Link Creation (Short & Burn modes)
✅ Access Validation (Click counting)
✅ Auto-Destruction (Verifying 404/410 status after limit reached)

## 🤝 Contributing

Contributions are welcome!

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See LICENSE for more information.

**Developed by** K.M. Chalaka Chamikara Bandara
📧 contact.chalaka@gmail.com
💻 GitHub Profile
