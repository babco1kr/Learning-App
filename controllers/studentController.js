const db = require("../models");
var axios = require("axios");

module.exports = {
    //finds student matching school & id number
    login: function (req, res) {
        db.Student.findAll({
            where: {
                studentNumber: req.body.studentNumber,
                school: req.body.school
            }
        })
            .then(results => res.status(200).json(results))
            .catch(err => res.status(422).json(err));
    },

    logStart: function (req, res) {
        db.Student.update({
            startTime: req.body.startTime,
            endTime: ""
        }, {
                where: {
                    studentNumber: req.body.studentNumber,
                    school: req.body.school
                }
            })
            .then(results => {
                if (results.changeRows === 0) {
                    res.status(404).json(err)
                } else {
                    res.status(200).json(results)
                }
            })
            .catch(err => res.status(422).json(err));
    },

    //update end time for given student
    logEnd: function (req, res) {
        db.Student.update({
            endTime: req.body.startTime
        }, {
                where: {
                    studentNumber: req.body.studentNumber,
                    school: req.body.school
                }
            })
            .then(results => {
                if (results.changeRows === 0) {
                    res.status(404).json(err)
                } else {
                    res.status(200).json(results)
                }
            })
            .catch(err => res.status(422).json(err));
    },

    //lookup what student is logged in, used as very asic form of "authentication"
    lookup: function(req, res) {
        db.Student.findAll({
            where: {
                studentNumber: req.body.studentNumber,
                school: req.body.school
            }
        })
            .then(results => {
                if (!results) {
                    res.status(404).json(err)
                } else {
                    res.status(200).json(results)
                }
            })
            .catch(err => res.status(422).json(err));
    },

    getQuestions: function(req, res) {
        // get teacherId pertaining to the student
        db.Student.findAll({
            where: {
                studentNumber: req.body.studentNumber,
                school: req.body.school
            }
        })
            .then(results => {
                var teacherId = results[0].dataValues.UserId;

                // get which units are active based on teacherID and school
                db.Unit.findAll({
                    where: {
                        teacherID: teacherId,
                        school: req.body.school,
                        active: true,
                    }
                })
                    .then(resultsTwo => {
                        //push all active units into an array, which will be used to find questions
                        let unitId = [];
                        for (let j = 0; j < resultsTwo.length; j++) {
                            unitId.push(resultsTwo[j].dataValues.id)
                        }
                        // get active questions
                        db.Spelling.findAll({
                            where: {
                                teacherID: teacherId,
                                school: req.body.school,
                                UnitId: unitId
                            }
                        })
                            .then(resultsThree => {
                                let arr = [];
                                for (let i = 0; i < resultsThree.length; i++) {
                                    //grab all necessary information to perform future tasks
                                    let word = resultsThree[i].dataValues.question;
                                    let image = resultsThree[i].dataValues.pictureLink;
                                        //if teacher doesn't load image, assign a (very small) stock image
                                        if (!image) {
                                            image = "https://upload.wikimedia.org/wikipedia/en/4/48/Blank.JPG"
                                        }
                                    let questionId = resultsThree[i].dataValues.id;
                                    let teacherId = resultsThree[i].dataValues.teacherID;
                                    let unitId = resultsThree[i].dataValues.UnitId;
                                    let questionGroup = {questionId, word, image, teacherId, unitId};
                                    arr.push(questionGroup);
                                }
                                    //finds all the questions the student has already answered
                                    db.Score.findAll({
                                        where: {
                                           StudentId: req.body.intStuNum,
                                        }
                                    }).then(resultsFour => {
                                        let answeredQuestions = [];
                                        // get list of all answered questions
                                        for (let j = 0; j < resultsFour.length; j++) {
                                            answeredQuestions.push(resultsFour[j].dataValues.questionID);
                                        };

                                        // gets rid of dulicate questions (aka, student answered them twice)
                                        var uniq = answeredQuestions.reduce(function(a,b){
                                            if (a.indexOf(b) < 0 ) a.push(b);
                                            return a;
                                          },[]);

                                          //array of the ID's for all already answered questions - used to check if student has already begun assignment
                                          let matchedIDs = [];
                                          for (let k = 0; k < arr.length; k++) {
                                            if (uniq.indexOf(arr[k].questionId) !== -1) {
                                                matchedIDs.push(arr[k].questionId);
                                                arr.splice(k, 1);
                                                k--;
                                            }
                                          }

                                          //if questions exist and student hasn't answered any, log a new start time. 
                                          if (arr.length !== 0 && matchedIDs.length === 0) {
                                            db.Student.update({
                                                startTime: req.body.startTime,
                                                endTime: null
                                            }, {
                                                    where: {
                                                        studentNumber: req.body.studentNumber,
                                                        school: req.body.school
                                                    }
                                                })
                                        }

                                          res.status(200).json(arr)
                                    })
                            })
                            .catch(err => res.status(422).json(err));
                    })
            })
            .catch(err => res.status(422).json(err));
    },

    //log students answer
    logAnswer: function(req, res) {
        db.Score.create(req.body)
        .then(results => res.json(results))
        .catch(err =>res.status(422).json(err));
    },

    //call Merriam-Webster dictionary API
    tts: function(req, res) {
        let apiKey = process.env.MERRIANAPI;
        let dictionaryURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + req.body.word + "?key=" + apiKey;
        axios.get(dictionaryURL).then(
            response => {
                //find how many pronunciations Merriam-Webster provides
                let dictLength = response.data[0].hwi.prs.length;
                let soundFile;
                for (let i = 0; i < dictLength; i++) {
                    //find the first pronunciation with an audio file and set that as the audio for the question
                    if (typeof response.data[0].hwi.prs[i].sound !== "undefined") {
                        soundFile = response.data[0].hwi.prs[i].sound.audio;
                        //stop for loop once audio file found
                        break;
                    }
                }
                res.json(soundFile);
            }
        );
    }
}