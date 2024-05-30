require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Root route for testing
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Log incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const authenticateToken = require('./middlewares/authenticateToken');

// Protected Route
app.get('/protected', authenticateToken, (req, res) => {
    res.send(`Hello ${req.user.username}, you have access to this protected route!`);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

