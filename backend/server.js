const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const { createDefaultAdminUser } = require('./controllers/authController');
const { loadPlayerData } = require('./utils/dataLoader');

// Import routes
const authRoutes = require('./routes/authRoutes');
const playerRoutes = require('./routes/playerRoutes');
const teamRoutes = require('./routes/teamRoutes');
const statsRoutes = require('./routes/statsRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Spirit11 API' });
});

// Initialize database and start server
const PORT = process.env.PORT || 5000;

// Test database connection
db.getConnection()
  .then(async (connection) => {
    console.log('Database connected successfully');
    connection.release();
    
    // Initialize data
    await createDefaultAdminUser();
    await loadPlayerData();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
    process.exit(1);
  });