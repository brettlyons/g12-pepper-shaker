var express = require('express');
var router = express.Router();

// CATCHALL
router.get('*', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
