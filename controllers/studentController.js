const db = require("../models");

module.exports = {
    login: function (req, res) {
        db.Student.findAll({
            where: {
                studentNumber: req.body.studentNumber,
                school: req.body.school
            }
        })
            .then(results => res.json(results))
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
    }
}