const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/main/main', { title: '메인페이지' });
});

module.exports = router;
