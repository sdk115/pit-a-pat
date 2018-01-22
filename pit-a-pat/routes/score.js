var express = require('express');
var router = express.Router();

var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');

var inputFile='../private/score/컴퓨터학개론.csv';

var parser = parse({delimiter: ','}, function (err, data) {
    async.eachSeries(data, function (line, callback) {
        // do something with the line
        // doSomething(line).then(function() {
        //     // when processing finishes invoke the callback to move to the next one
        //     callback();
        // });
        console.log(line)
    })
});
fs.createReadStream(inputFile).pipe(parser);

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/score',urlencodedParser, function (req, res, next) {
    console.log(req.body)
    res.render('score');
});

module.exports = router;
