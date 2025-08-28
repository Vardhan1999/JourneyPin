const express = require('express');
const router = express.Router();

// Dummy users data
const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Vardhan',
    email: 'vardhan@example.com'
  },
  {
    id: 'u2',
    name: 'Alice',
    email: 'alice@example.com'
  },
  {
    id: 'u3',
    name: 'Bob',
    email: 'bob@example.com'
  }
];

// GET /api/users
router.get('/', (req, res, next) => {
  res.json({ users: DUMMY_USERS });
});

module.exports = router;
