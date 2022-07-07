const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../lib/db');

const router = express.Router();

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

router.post('/signup', async (req, res) => {
  const { email, password, nickname, birth } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = {
    email,
    password: hashedPassword,
    nickname,
    birth,
  };

  db.get('users').push(user).write();

  res.render('pages/auth/signin');
});

module.exports = router;
