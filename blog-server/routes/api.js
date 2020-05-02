var express = require("express");
var router = express.Router();
const assert = require("assert");
var jwt = require("jsonwebtoken");
const config = require("universal-config");

var mongoUtil = require("../mongoUtil");

/* the returned posts should be included in the body of the 
response as an array in JSON even if the user has zero or one post.*/
router.get("/:username", function (req, res, next) {
  let username = req.params.username;

  if (!username) {
    return res.sendStatus(400);
  }

  if (typeof req.cookies.jwt === "undefined") {
    //check #1: no cookie in the header
    return res.sendStatus(401); //doing return res.send returns the function so code below won't run, avoids the set header after they are sent to client
  }

  let token = req.cookies.jwt;

  jwt.verify(token, config.get("SECRET_KEY"), function (err, decoded) {
    let curr_time = decoded.exp * 1000;

    if (Date.now() > curr_time) {
      //check #2: jwt token expired
      res.sendStatus(401);
    } else if (decoded.usr !== username) {
      //check #3: if the username in jwt does not match username in URL
      res.sendStatus(401);
    } else {
      const col = mongoUtil.db().collection("Posts");

      col.find({ username: username.toString() }).toArray(function (err, docs) {
        //content type switches to application/json
        res.status(200).send(docs);
      });
    }
  });
  //res.send('respond with a resource');
});

//TODO: tip: if you include modules in app.js, you can use it in your middleware
router.get("/:username/:postid", function (req, res, next) {
  let username = req.params.username;
  let postid = req.params.postid;

  if (!username || !postid) {
    //not including required data
    return res.sendStatus(400);
  }

  if (typeof req.cookies.jwt === "undefined") {
    //check #1: no cookie in the header
    return res.sendStatus(401); //doing return res.send returns the function so code below won't run, avoids the set header after they are sent to client
  }

  let token = req.cookies.jwt;

  jwt.verify(token, config.get("SECRET_KEY"), function (err, decoded) {
    //TODO: need to add error checking here where exp is not defined, we should throw an error
    //telling person to log in first
    let curr_time = decoded.exp * 1000;

    if (Date.now() > curr_time) {
      //check #2: jwt token expired
      res.sendStatus(401);
    } else if (decoded.usr !== username) {
      //check #3: if the username in jwt does not match username in URL
      res.sendStatus(401);
    } else {
      const col = mongoUtil.db().collection("Posts");

      col
        .find({
          $and: [{ postid: Number(postid) }, { username: username.toString() }],
        })
        .toArray(function (err, docs) {
          if (1 !== docs.length) {
            res.sendStatus(404);
          } else {
            //content type switches to application/json
            res.status(200).send(docs[0]);
          }
        });
    }
  });
});

router.post("/:username/:postid", function (req, res) {
  let username = req.params.username;
  let postid = req.params.postid;

  let title = req.body.title;
  let body = req.body.body;

  if (!username || !postid) {
    return res.sendStatus(400);
  }

  if (typeof req.cookies.jwt === "undefined") {
    //check #1: no cookie in the header
    return res.sendStatus(401); //doing return res.send returns the function so code below won't run, avoids the set header after they are sent to client
  }

  let token = req.cookies.jwt;

  jwt.verify(token, config.get("SECRET_KEY"), function (err, decoded) {
    let curr_time = decoded.exp * 1000;

    if (Date.now() > curr_time) {
      //check #2: jwt token expired
      res.sendStatus(401);
    } else if (decoded.usr !== username) {
      //check #3: if the username in jwt does not match username in URL
      res.sendStatus(401);
    } else {
      let created = Date.now(); //correct return values
      let modified = Date.now();

      const col = mongoUtil.db().collection("Posts");

      col
        .find({
          $and: [{ postid: Number(postid) }, { username: username.toString() }],
        })
        .toArray(function (err, docs) {
          if (docs.length == 1) {
            //meaning this postid and username exists, throw 400 error
            res.sendStatus(400);
          } else {
            col.insertOne(
              {
                postid: Number(postid),
                username: username,
                created: created,
                modified: modified,
                title: title,
                body: body,
              },
              function (err, r) {
                assert.equal(null, err);
                assert.equal(1, r.insertedCount);
                res.sendStatus(201);
              }
            );
          }
        });
    }
  });
});

router.put("/:username/:postid", function (
  req,
  res,
  next //*title and body in its body in JSON
) {
  let username = req.params.username;
  let postid = req.params.postid;

  let title = req.body.title;
  let body = req.body.body;

  if (!username || !postid) {
    return res.sendStatus(400);
  }

  if (typeof req.cookies.jwt === "undefined") {
    //check #1: no cookie in the header
    return res.sendStatus(401); //doing return res.send returns the function so code below won't run, avoids the set header after they are sent to client
  }

  let token = req.cookies.jwt;

  jwt.verify(token, config.get("SECRET_KEY"), function (err, decoded) {
    let curr_time = decoded.exp * 1000;

    if (Date.now() > curr_time) {
      //check #2: jwt token expired
      res.sendStatus(401);
    } else if (decoded.usr !== username) {
      //check #3: if the username in jwt does not match username in URL
      res.sendStatus(401);
    } else {
      let modified = Date.now();

      const col = mongoUtil.db().collection("Posts");

      col.updateOne(
        {
          $and: [{ postid: Number(postid) }, { username: username.toString() }],
        },
        { $set: { body: body, title: title, modified: modified } },
        function (err, r) {
          if (r.matchedCount == 0) {
            //meaning none were matched
            res.sendStatus(400);
          } else {
            res.sendStatus(200);
          }
        }
      );
    }
  });
});

router.delete("/:username/:postid", function (req, res, next) {
  let username = req.params.username;
  let postid = req.params.postid;

  if (!username || !postid) {
    return res.sendStatus(400);
  }

  if (typeof req.cookies.jwt === "undefined") {
    //check #1: no cookie in the header
    return res.sendStatus(401); //doing return res.send returns the function so code below won't run, avoids the set header after they are sent to client
  }

  let token = req.cookies.jwt;

  jwt.verify(token, config.get("SECRET_KEY"), function (err, decoded) {
    let curr_time = decoded.exp * 1000;

    if (Date.now() > curr_time) {
      //check #2: jwt token expired
      res.sendStatus(401);
    } else if (decoded.usr !== username) {
      //check #3: if the username in jwt does not match username in URL
      res.sendStatus(401);
    } else {
      const col = mongoUtil.db().collection("Posts");

      col.deleteOne(
        {
          $and: [{ postid: Number(postid) }, { username: username.toString() }],
        },
        function (err, r) {
          if (r.deletedCount !== 1) {
            //there is not such post
            res.sendStatus(400);
          } else {
            res.sendStatus(204);
          }
        }
      );
    }
  });
});

module.exports = router;
