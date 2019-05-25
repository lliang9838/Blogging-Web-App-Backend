var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    let redirect = req.query.redirect //optional parameter

    
    if(redirect !== 'undefined') //if it's passed in, add it to template data
    {    
        res.render('login', {redirect:redirect})
    }
    else
    {
        res.render('login')
    }

});

// POST method route
router.post('/', function (req, res, next) {
    res.send('we are in POST')
});

module.exports = router;