var express = require('express');
var router = express.Router();
const assert = require('assert');
var jwt = require('jsonwebtoken');

var mongoUtil = require( '../mongoUtil' );

/* the returned posts should be included in the body of the 
response as an array in JSON even if the user has zero or one post.*/
router.get('/:username', function(req, res, next) 
{
    let username = req.params.username 

    const col = mongoUtil.db().collection('Posts')

    col.find({"username":username.toString()}).toArray(function(err, docs) {
        //console.log(docs)

        //content type switches to application/json
        res.status(200).send(docs)
    });

    //res.send('respond with a resource');
});

//TODO: tip: if you include modules in app.js, you can use it in your middleware
router.get('/:username/:postid', function(req, res, next) 
{
    console.log(req.cookies.jwt)

    let token = req.cookies.jwt

    jwt.verify(token,"C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c",function(err, decoded) {
        
        let curr_time = decoded.exp*1000
        console.log(curr_time)
        console.log(Date.now())

        let d = Date(Date.now())
        let tok = new Date(curr_time);

        console.log(d.toString());
        console.log(tok.toString());

        

        console.log(decoded.usr)
      });

    let username = req.params.username 
    let postid = req.params.postid

    const col = mongoUtil.db().collection('Posts')

    col.find({$and: [{"postid":Number(postid)}, {"username": username.toString()}]}).toArray(function(err, docs) {

        //console.log(docs)

        if(1 !== docs.length)
        {
            res.sendStatus(404);
        }
        else
        {
            //content type switches to application/json
            res.status(200).send(docs[0])
        }
    });

    //res.send('respond with a resource');
});
  
router.post('/:username/:postid', function(req, res, next) //*title and body in its body in JSON
{
    let username = req.params.username 
    let postid = req.params.postid

    let title = req.body.title
    let body = req.body.body

    let created = Date.now() //correct return values
    let modified = Date.now()

    const col = mongoUtil.db().collection('Posts')

    col.find({$and: [{"postid":Number(postid)}, {"username": username.toString()}]}).toArray(function(err, docs) {
        
        if(docs.length == 1) //meaning this postid and username exists, throw 400 error
        {
            res.sendStatus(400)
        }
        else
        {
            col.insertOne({postid:Number(postid) ,username: username, created:created, modified:modified,title:title, body:body },function(err, r) {
                assert.equal(null, err);
                assert.equal(1, r.insertedCount);
                res.sendStatus(201)
            });
        }
    });
});

router.put('/:username/:postid', function(req, res, next) //*title and body in its body in JSON
{
    let username = req.params.username
    let postid = req.params.postid

    let title = req.body.title
    let body = req.body.body

    let modified = Date.now()

    const col = mongoUtil.db().collection('Posts')

    col.updateOne({$and: [{"postid":Number(postid)}, {"username": username.toString()}]}, {$set: {body:body, title:title,modified:modified }}, function(err, r) {
        
        if(r.matchedCount == 0) //meaning none were matched
        {
            res.sendStatus(400)
        }
        else
        {
            res.sendStatus(200)
        } 

    });
       
});

router.delete('/:username/:postid', function(req, res, next)
{
    let username = req.params.username
    let postid = req.params.postid

    const col = mongoUtil.db().collection('Posts')

    col.deleteOne({$and: [{"postid":Number(postid)}, {"username": username.toString()}]}, function(err, r) {
        
        if(r.deletedCount !== 1) //there is not such post
        {
            res.sendStatus(400)
        }
        else
        {
            res.sendStatus(204)
        }
    });
});

module.exports = router;