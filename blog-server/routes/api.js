var express = require('express');
var router = express.Router();

var mongoUtil = require( '../mongoUtil' );

/* the returned posts should be included in the body of the 
response as an array in JSON even if the user has zero or one post.*/
router.get('/:username', function(req, res, next) 
{
    let username = req.params.username 

    const col = mongoUtil.db().collection('Posts')

    col.find({"username":username.toString()}).toArray(function(err, docs) {
        console.log(docs)

        //content type switches to application/json
        res.status(200).send(docs)
    });

    //res.send('respond with a resource');
});
  
module.exports = router;