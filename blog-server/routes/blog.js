var express = require('express');
var router = express.Router();
var commonmark = require('commonmark')
var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();

const assert = require('assert');

var mongoUtil = require( '../mongoUtil' );


router.get('/:username', function(req, res, next) 
{
  let username = req.params.username 
  let start = req.query.start

  //console.log(start)
  let idx = 0
  if(typeof start !== 'undefined') //this is the correct way to check if something is undefined
  {
    
    idx = start-1; //if start index is not undefined, this we assign idx to start
  }
  
  //let's try to show the first 5 posts, next button handled later
  const col = mongoUtil.db().collection('Posts')

  let cursor = col.find({"username":username});

  cursor.toArray(function(err, docs) {
      assert.equal(null, err);
      
      //console.log(docs)
      

      //should the parsing be done here?

      let arr = [];
      let button = false;

      
      if(docs.length-(idx+1) >= 5)
      {
        button = true;
      }

      //("My index is " + idx)
      for(let i = idx; i < Math.min(5+idx, docs.length); i++) //this is the converting part as well, only pushes the first 5 for now
      {

        var obj = {title:writer.render(reader.parse(docs[i].title)), body:writer.render(reader.parse(docs[i].body))}
        
        arr.push(obj)
      }
      
      //console.log(arr)
      res.render('blog', {my_arr:arr, username:username, button:button, idx:idx, docs:docs }); 
      //res.render('blog_id', {title:my_title,body:my_body}) //sending to view template blog_id with template data
    });
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
      var title = docs[0].title
      var body = docs[0].body

      
      var parsed_t = reader.parse(title); // parsed is a 'Node' tree
      // transform parsed if you like...
      var my_title = writer.render(parsed_t); // result is a String

      var parsed_b = reader.parse(body);
      var my_body = writer.render(parsed_b);

      res.render('blog_id', {title:my_title,body:my_body}) //sending to view template blog_id with template data
    });
    
    
    //res.send('hi');

  });
  
  module.exports = router;