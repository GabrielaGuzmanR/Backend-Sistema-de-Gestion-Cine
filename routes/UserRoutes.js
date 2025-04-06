const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /users
router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// POST /users
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
