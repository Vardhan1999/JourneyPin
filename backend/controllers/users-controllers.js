const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

// Dummy users data
let DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Vardhan',
    email: 'vardhan@example.com',
    password: 'vardhan123'
  },
  {
    id: 'u2',
    name: 'Alice',
    email: 'alice@example.com',
    password: 'alice123'
  },
  {
    id: 'u3',
    name: 'Bob',
    email: 'bob@example.com',
    password: 'bob123'
  }
];

exports.getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find(u => u.email === email);
  if (hasUser) {
    return next(
      new HttpError('Could not create user, email already exists.', 422)
    );
  }

  const createdUser = {
    id: uuid(),
    name,
    email,
    password
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new HttpError('Could not identify user, credentials seem to be wrong.', 401)
    );
  }

  res.json({ message: 'Logged in!' });
};
