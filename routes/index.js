const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/main/main', { title: 'My배민' });
});

module.exports = router;
