var express = require('express');
var router = express.Router();

var mongoUtil = require( '../mongoUtil' );


router.get('/:username', function(req, res, next) {
  res.send('username');
});

//Question: how to share a single database connection and reuse the created connection for all MongoDB commands.
/* GET home page. */
router.get('/:username/:postid', function(req, res, next) {
    let username = req.params.username; //get the username
    let postid = req.params.postid; //get the postid

    
    //console.log(db)
    const col = mongoUtil.db().collection('Posts')
    console.log(mongoUtil.db())
    console.log('ok')
    // col.find({$and: [{"postid":postid}, {"username":username}] }).toArray(function(err, docs) {
    //   assert.equal(null, err);
    //  //assert.equal(2, docs.length);
    //   console.log(docs)
    //   client.close();
    // });
    
    res.send('hi');

  });
  
  module.exports = router;