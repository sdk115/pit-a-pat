var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({extended:false})
/* GET home page. */

function getFileNames() {
    const  scoreFolder = '../private/score';
    const fs = require('fs');

    names = fs.readdirSync(scoreFolder)
    for (i in names){
        names[i] = names[i].replace(/\.[^/.]+$/, "")
    }
    return names
}

router.get('/login', function (req, res, next) {
    res.render('login', {data: getFileNames()});
});

module.exports = router;
