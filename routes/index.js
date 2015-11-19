var express = require('express');
var router = express.Router();

/* CATCHALL */
router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '../public/'
  })
});

module.exports = router;
