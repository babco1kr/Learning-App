const db = require("../models");

module.exports = {
    createStudent: function(req, res) {
        console.log(req.body);
        db.Student.create(req.body)
        .then(results => res.json(results))
        .catch(err =>res.status(422).json(err));
    },

    findStudents: function(req, res) {
        console.log("THIS IS: " + req.body);
        res.json(req.body);
    },

    addUnit: function(req, res) {
        console.log(req.body);
        db.Unit.create(req.body)
        .then(results => res.json(results))
        .catch(err => res.status(422).json(err));
    },

    addSpelling: function(req, res) {
        console.log(req.body);
        db.Spelling.create(req.body)
        .then(results => res.json(results))
        .catch(err => res.status(422).json(err));
    },

    findUnits: function(req, res) {
        console.log(req.body);
        db.Unit.findAll({
            where: {
                teacherID: req.body.teacherID,
                school: req.body.school
            }
        }).then(results => {
            res.json(results)
        }).catch(err => res.status(422).json(err));
    },

    updateActive: function(req, res) {
        // console.log(req.body);
        let newState;
        db.Unit.findAll({
            where: {
                id: req.body.unitId,
                teacherID: req.body.teacherID,
                school: req.body.school
            }
        }).then(results => {
            // console.log(results[0].dataValues.active);
            if (results[0].dataValues.active) {
                newState = false;
            } else {
                newState = true;
            }
            db.Unit.update({
                active: newState
            }, {
                where: {
                    id: req.body.unitId,
                    teacherID: req.body.teacherID,
                    school: req.body.school 
                }
            }).then(data => {
                res.json(data)
            }).catch(err => res.status(422).json(err));
        })
    }
}