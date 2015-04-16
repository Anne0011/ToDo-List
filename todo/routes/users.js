var express = require('express');
var router = express.Router();

// whats this for????? looks like cruft, i would drop it

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
