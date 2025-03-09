# SpiritX_Scope_02
 
🏆 Fully Functional Project 2
📌 Project Overview

This is a fully functional web-based application developed with modern technologies, featuring real-time updates using WebSockets, an AI-powered chatbot, and a robust admin panel.
🚀 Key Features

    User Side: Interactive UI, real-time updates, and seamless navigation.
    Admin Side: A powerful dashboard to manage users, teams, and player stats.
    Optimized AI Chatbot: Helps users select teams intelligently based on player statistics.
    Real-time Updates with WebSockets: Ensures live data synchronization.
    High Performance & Scalability: Optimized backend and efficient database queries.
    Secure Authentication: Ensures data privacy and controlled access.

⚙️ Tech Stack
Stack	Technology Used
Frontend	Next.js, Tailwind CSS
Backend	Node.js, Express.js, WebSockets (Socket.io)
Database	MySQL
🌟 Features in Detail
✅ User Side

    User Authentication: Secure signup and login system with validation.
    Dynamic Team Selection: Users can build teams based on real-time player stats.
    Real-Time Data Sync: Updates team stats, leaderboards, and player information without refreshing.
    AI Chatbot Assistance: Provides insights and suggestions for team selection.
    Live Score & Match Updates: Display real-time player and match performance.

✅ Admin Side

    Admin Dashboard: Manage users, teams, and player statistics efficiently.
    Real-Time Player Updates: Admin changes reflect immediately across all users.
    Data Management: CRUD operations for adding, updating, and deleting records.
    Performance Optimization: Backend queries are optimized for faster retrieval.

✅ Real-Time Updates with WebSockets

We have implemented WebSockets (Socket.io) to ensure real-time synchronization across the application:

    Player Statistics: Updates instantly when admin modifies player stats.
    Leaderboard: Reflects rank changes dynamically.
    Team Management: Ensures all users see the latest team compositions.
    Chatbot Insights: Provides real-time feedback on player selections.

🤖 AI-Powered Chatbot

We have integrated an AI-powered chatbot that helps users make informed decisions while selecting teams:

    Provides insights on player stats, recent performance, and selection strategies.
    Suggests the best possible team based on historical data.
    Uses real-time WebSocket updates to fetch the latest statistics.
    Ensures users make optimal selections using intelligent algorithms.

🔧 Installation & Setup


📦 2. Install Dependencies

    Frontend Setup

cd frontend
npm install
npm run dev

Backend Setup

    cd backend
    npm install
    npm run dev

🔌 3. WebSocket Integration

Make sure your backend WebSocket server is running so that real-time updates are delivered:

    The backend uses Socket.io to push real-time updates to connected clients.
    The frontend listens for updates and re-renders UI dynamically.


Password ans username of admin
  username-Dasun123
  password = da$uN123
  
