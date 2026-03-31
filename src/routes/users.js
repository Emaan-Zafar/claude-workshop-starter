const express = require('express');
const router = express.Router();
const { registerUser, listUsers } = require('../services/user-service');

router.post('/register', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  const user = registerUser(name, email);
  res.status(201).json(user);
});

router.get('/list', (req, res) => {
  res.json({ users: listUsers() });
});

module.exports = router;
