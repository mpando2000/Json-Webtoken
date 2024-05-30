// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = []; // In-memory user storage (for demo purposes only)
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
   
    res.status(201).send('User registered successfully');
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).send('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).send('TInvalid credentials');
    }
    // console.log(req.body)

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.send({ token });
    
};
