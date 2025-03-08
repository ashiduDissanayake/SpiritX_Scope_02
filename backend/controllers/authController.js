const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// User registration
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    if (username.length < 8) {
      return res.status(400).json({ message: 'Username must be at least 8 characters long' });
    }
    
    // Check if username already exists
    const [existingUsers] = await db.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const [result] = await db.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    
    res.status(201).json({ 
      message: 'User created successfully',
      userId: result.insertId
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    // Find user
    const [users] = await db.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, isAdmin: user.is_admin },
      process.env.JWT_SECRET || 'spiritx2025secret',
      { expiresIn: '24h' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        isAdmin: user.is_admin
      }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Failed to login' });
  }
};

// Create default admin user if it doesn't exist
exports.createDefaultAdminUser = async () => {
  try {
    // Check if default admin exists
    const [existingAdmins] = await db.execute(
      'SELECT * FROM users WHERE username = ?',
      ['spiritx_2025']
    );
    
    if (existingAdmins.length > 0) {
      console.log('Default admin user already exists.');
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash('SpiritX@2025', 12);
    
    // Create admin user
    await db.execute(
      'INSERT INTO users (username, password, is_admin) VALUES (?, ?, ?)',
      ['spiritx_2025', hashedPassword, true]
    );
    
    console.log('Default admin user created successfully.');
  } catch (error) {
    console.error('Error creating default admin user:', error);
  }
};