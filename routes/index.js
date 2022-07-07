const express = require('express');
const db = require('../lib/db');
const router = express.Router();

router.get('/', (req, res) => {
  const userSession = req.session;

  let userData = null;
  if (userSession.email) {
    userData = db.get('users').find({ email: userSession.email }).value();
  }
  res.render('pages/main/main', { title: 'My배민', userData });
});

router.get('/signin', (req, res) => {
  res.render('pages/auth/signin');
});

router.get('/signup/term', (req, res) => {
  res.render('pages/auth/signup-service-term', { title: '회원가입' });
});

router.get('/signup/phone', (req, res) => {
  res.render('pages/auth/signup-phone', { title: '회원가입' });
});

router.get('/signup/detail', (req, res) => {
  res.render('pages/auth/signup-detail', { title: '회원가입' });
});

module.exports = router;
