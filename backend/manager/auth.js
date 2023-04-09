const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Register request:', req.body);

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12); 
    const newUser = await User.create({ username, email, password: hashedPassword }); 

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.log('Register error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.'
    })}

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    
    res.status(200).json({ message: 'Logged in successfully', token, user });
    } catch (error) {
    res.status(500).json({ message: 'Server error', error });
    }
    };
    
    module.exports = {
    register,
    login
    };