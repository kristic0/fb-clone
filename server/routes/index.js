var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.send('server is working').status(200);
});

module.exports = router;
