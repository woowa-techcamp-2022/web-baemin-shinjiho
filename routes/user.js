const express = require('express');
const db = require('../lib/db');
const router = express.Router();

router.get('/signin', (req, res) => {
  res.render('pages/auth/signin');
});

router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  const exUser = db.get('users').find({ email }).value();
  if (exUser) {
    // TODO : 비밀번호 검증 방법 수정
    if (exUser.password === password) {
      req.session.email = email;
      return req.session.save((err) => {
        if (err) throw err;
        res.redirect(302, '/');
      });
    }
  }

  res.render('pages/auth/signin', { error: '이메일 또는 비밀번호를 다시 확인해주세요.' });
});

module.exports = router;
