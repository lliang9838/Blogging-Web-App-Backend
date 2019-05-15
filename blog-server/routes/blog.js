var express = require('express');
var router = express.Router();

var mongoUtil = require( '../mongoUtil' );
var db = mongoUtil.getDb();

router.get('/:username', function(req, res, next) {
  res.send('username');
});

/* GET home page. */
router.get('/:username/:postid', function(req, res, next) {
    let username = req.params.username; //get the username
    let postid = req.params.postid; //get the postid

    const collection = db.collection('Posts');
    
    res.send('hi');

  });
  
  module.exports = router;