const express = require('express');
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

    res.render('/signin', { error: '비밀번호가 일치하지 않습니다.' });
  }

  res.render('/signin', { error: '존재하지 않는 이메일입니다.' });
});

module.exports = router;
