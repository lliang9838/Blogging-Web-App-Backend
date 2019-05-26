var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

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
        //console.log('false')
        //TODO: tip #2: to send html in response body. the string needs to be in line
        res.status(401).send("<head><title>Blog Web Page</title></head><body><form  method=\"post\">Username:<br><input type=\"text\" name=\"username\"><br\>Password:<br><input type=\"password\" name=\"password\"><input type=\"submit\" value=\"Login\"></form></body>")
      }
      else{
        console.log(docs)
        bcrypt.compare(plain_password, docs[0].password, function(err, result) { //reaching here means we're validated
            if(result) //meaning true,
            {
                console.log('true')
               
                jwt.sign({
                  exp : Math.floor(Date.now() / 1000) + (120 * 60),
                  usr : username
                } , 
                 "C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c", 
                 { header: {
                  "alg": "HS256",
                  "typ": "JWT"
                  } },
                  function(err, token) { //TODO: tip #1: if the desired result isn't obtained, check the err message to troubleshoot
                      console.log(err)
                      console.log('token is ' + token);

                      res.cookie('jwt', token);
                      if(redirect) //if redirect was passed in
                      {
                       // res.cookie('jwt', token);
                        res.redirect(redirect);
                      }
                      else
                      {
                        res.status(200).send('<p>The authentication is successful</p>')
                      }
                    });
            }
            else
            {
                res.status(401).send("<head><title>Blog Web Page</title></head><body><form  method=\"post\">Username:<br><input type=\"text\" name=\"username\"><br\>Password:<br><input type=\"password\" name=\"password\"><input type=\"submit\" value=\"Login\"></form></body>")
            }
            
        });
      }
      
    });

    

   //res.send('we are in POST')
});

module.exports = router;