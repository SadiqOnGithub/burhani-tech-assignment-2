const express = require('express');
const router = express.Router();

router.get('^/$|/index(.html)?', (req, res) => {
  // send an html file instead
  res.send('Welcome')
});

module.exports = router;