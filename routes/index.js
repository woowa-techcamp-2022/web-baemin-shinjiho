const express = require('express');
const db = require('../lib/db');
const router = express.Router();

router.get('/', (req, res) => {
  const userSession = req.session;

  let userData = null;
  if (userSession.email) {
    userData = db.get('users').find({ email: userSession.email }).value();
  }
  res.render('pages/main/main', { title: 'My배민', headerTitle: 'My배민', userData });
});

router.get('/signin', (req, res) => {
  res.render('pages/auth/signin', { title: '로그인' });
});

router.get('/signup/term', (req, res) => {
  res.render('pages/auth/signup-service-term', { title: '약관동의', headerTitle: '회원가입' });
});

router.get('/signup/phone', (req, res) => {
  res.render('pages/auth/signup-phone', { title: '휴대폰 인증', headerTitle: '회원가입' });
});

router.get('/signup/detail', (req, res) => {
  res.render('pages/auth/signup-detail', { title: '회원가입', headerTitle: '회원가입' });
});

module.exports = router;
