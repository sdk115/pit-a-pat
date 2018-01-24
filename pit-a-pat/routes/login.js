var express = require('express');
var router = express.Router();
/* GET home page. */

function getFileNames(scoreFolder, callback) {
    const fs = require('fs');

    fs.readdir(scoreFolder, (err, files) => {
        callback(files)
    })
}

router.get('/login', function (req, res, next) {
    const scoreFolder = '../private/score';

    getFileNames(scoreFolder, function(files){
        for (i in files){
            // 확장자 제거
            files[i] = files[i].replace(/\.[^/.]+$/, "")
        }
        res.render('login', {data: files})
    });
});

module.exports = router;
