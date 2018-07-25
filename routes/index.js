var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      local: true,
      pageTitle: 'Project Andes',
      list: [
          "line 1",
          "line 2",
          "line 3"
      ]
  });
});

module.exports = router;
