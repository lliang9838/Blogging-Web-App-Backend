var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    let redirect = req.query.redirect //optional parameter


    
    res.render('login', {redirect:redirect})
    
});

// POST method route
router.post('/', function (req, res, next) {
    console.log(req.body.username)
    console.log(req.body.password)
    console.log(req.body.redirect)
    res.send('we are in POST')
});

module.exports = router;