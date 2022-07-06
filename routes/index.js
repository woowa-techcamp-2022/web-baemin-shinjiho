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

module.exports = router;
