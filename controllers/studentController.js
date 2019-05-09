const db = require("../models");

module.exports = {
    login: function (req, res) {
        // console.log(req.body);
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
            startTime: req.body.startTime
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

    lookup: function(req, res) {
        db.Student.findAll({
            where: {
                studentNumber: req.body.studentNumber,
                school: req.body.school
            }
        })
            .then(results => {
                // console.log(results);
                if (!results) {
                    res.status(404).json(err)
                } else {
                    res.status(200).json(results)
                }
            
            })
            .catch(err => res.status(422).json(err));
    },

    getQuestions: function(req, res) {
        console.log("working");

        // get teacherId pertaining to the student
        db.Student.findAll({
            where: {
                studentNumber: req.body.studentNumber,
                school: req.body.school
            }
        })
            .then(results => {
                var teacherId = results[0].dataValues.UserId;

                // get which unit is active
                db.Unit.findAll({
                    where: {
                        teacherID: teacherId,
                        school: req.body.school,
                        active: true,
                    }
                })
                    .then(resultsTwo => {
                        let unitId = [];
                        for (let j = 0; j < resultsTwo.length; j++) {
                            unitId.push(resultsTwo[j].dataValues.id)

                        }
                        console.log(unitId);

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
                                    let word = resultsThree[i].dataValues.question;
                                    let image = resultsThree[i].dataValues.pictureLink;
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
                                        console.log(resultsFour);
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
                                          console.log(uniq);
                                          console.log(arr);
                                          for (let k = 0; k < arr.length; k++) {
                                              console.log(arr[k].questionId);
                                            if (uniq.indexOf(arr[k].questionId) !== -1) {
                                                arr.splice(k, 1);
                                                k--;
                                            }
                                          }
                                          console.log(arr);
                                          res.status(200).json(arr)
                                    })
                            })
                            .catch(err => res.status(422).json(err));
                    })
            })
            .catch(err => res.status(422).json(err));
    },

    logAnswer: function(req, res) {
        console.log(req.body);
        db.Score.create(req.body)
        .then(results => res.json(results))
        .catch(err =>res.status(422).json(err));
    },



}