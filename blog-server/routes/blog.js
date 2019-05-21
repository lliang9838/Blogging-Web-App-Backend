var express = require('express');
var router = express.Router();

const assert = require('assert');

var mongoUtil = require( '../mongoUtil' );


router.get('/:username', function(req, res, next) {
  res.send('username');
});

//Question: how to share a single database connection and reuse the created connection for all MongoDB commands.
/* GET home page. */
router.get('/:username/:postid', function(req, res, next) {
    let username = req.params.username; //get the username
    let postid = req.params.postid; //get the postid

   // console.log(typeof username)
   // console.log(typeof postid)
    
    const col = mongoUtil.db().collection('Posts')
    // console.log(mongoUtil.db())

    col.find({$and: [{"postid":Number(postid)}, {"username": username.toString()}]}).toArray(function(err, docs) {
      assert.equal(null, err);
      assert.equal(1, docs.length);
      console.log(docs)
      var my_title = docs[0].title
      var my_body = docs[0].body

      res.render('blog_id', {title:my_title,body:my_body}) //sending to view template blog_id with template data
    });
    
    
    //res.send('hi');

  });
  
  module.exports = router;