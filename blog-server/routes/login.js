var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;

const assert = require('assert');
var mongoUtil = require( '../mongoUtil' );

/* GET users listing. */
router.get('/', function(req, res, next) {
    let redirect = req.query.redirect //optional parameter


    
    res.render('login', {redirect:redirect})
    
});

// POST method route
router.post('/', function (req, res, next) {

    let username = req.body.username
    let plain_password = req.body.password
    let redirect = req.body.redirect

    const col = mongoUtil.db().collection('Users')
    // console.log(mongoUtil.db())


    col.find({"username":username.toString()}).toArray(function(err, docs) {
        assert.equal(null, err);

      if(1 !== docs.length) //cannot have more than one username
      {
        res.sendStatus(404);
      }
      else{
        console.log(docs)
        bcrypt.compare(plain_password, docs[0].password, function(err, result) { //reaching here means we're validated
            console.log(result)
            res.send('hi')
            
        });
      }
      
    });

    

   res.send('we are in POST')
});

module.exports = router;