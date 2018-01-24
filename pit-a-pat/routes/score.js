var express = require('express');
var router = express.Router();


function readCSV(fileName, callback){
    var fs = require('fs');
    var parse = require('csv-parse');
    const privatePath='../private/score/';
    const finalPath = privatePath+fileName+".csv"

    var csvData=[];
    fs.createReadStream(finalPath)
        .pipe(parse({delimiter: ','}))
        .on('data', function(csvrow) {
            csvData.push(csvrow);
        })
        .on('end',function() {
            // split header, calc sum, sort
            var title = csvData[0]
            var scores = csvData.slice(1)

            callback(title,scores)
        });
}

function searchScore(id, pwd, scores){
    for(i in scores){
        console.log(scores[i][0]+"!"+id+pwd)
        if( scores[i][0] == id && scores[i][1] == pwd){
            return scores[i]
        }
    }
    return null
}

function getScoreByTitle(titles, scores, title){
    var title_index = -1;
    var ret = []

    for(var i in titles){
        if(titles[i] == title){
            title_index =  i;
            break;
        }
    }

    if(title_index == -1) return null;
    for(var i in scores){
        ret.push(parseFloat(scores[i][title_index]));
    }

    ret.sort();
    return ret;
}

function changeHistogramData(scores){
    var max_value = Math.max(scores)
    var min_value = Math.min(scores)

    var ret = []
    var boundaries = []
    var buck_count = 10
    var stride = (max_value + min_value) / 10
    var now = min_value

    while (true){
        boundaries.push(now)
        ret.push(0)
        if(now > max_value) break
        now += stride
    }

    for (var i in scores){
        for (var j = 0; j < boundaries.length+1; j++){

        }

    }


    return ret
}

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/score',urlencodedParser, function (req, res, next) {
    console.log(req.body)
    readCSV(req.body['subject'], function(titles, scores){

        var myScore = searchScore(req.body['id'], req.body['password'], scores)

        //reponse score data
        if(myScore == null)
        {
            res.render('score', {myScore: null, midScore:null, finalScore:null});
        }
        else
        {
            var midScores = getScoreByTitle(titles,scores,"중간고사")
            var finalScores = getScoreByTitle(titles,scores,"기말고사")

            myScore = myScore.slice(3)
            titles = titles.slice(3)
            console.log(midScores)

            res.render('score', {title:titles, myScore: myScore,  midScores:midScores, finalScores:finalScores});
        }
    });
});

module.exports = router;
