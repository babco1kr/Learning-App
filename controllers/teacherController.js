const db = require("../models");

module.exports = {
    createStudent: function(req, res) {
        console.log(req.body);
        db.Student.create(req.body)
        .then(results => res.json(results))
        .catch(err =>res.status(422).json(err));
    },

    findStudents: function(req, res) {
        db.Student.findAll({
            where: {
                UserId: req.body.UserId,
                school: req.body.school
            }
        }).then(results => {res.json(results)})
        .catch(err => res.status(422).json(err));
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
        let newState;
        db.Unit.findAll({
            where: {
                id: req.body.unitId,
                teacherID: req.body.teacherID,
                school: req.body.school
            }
        }).then(results => {
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
    },

    deleteStudent: function(req, res) {
        db.Score.destroy({
            where: {
                StudentId: req.body.id
            }
        }).then(results => {
            db.Student.destroy({
                where: {
                    id: req.body.id
                }
            }).then(data => {
                res.json(data);
            }).catch(err => res.status(422).json(err));
        })
    },

    deleteUnit: function(req, res) {
        db.Spelling.destroy({
            where: {
                UnitId: req.body.id
            }
        }).then(results => {
            db.Unit.destroy({
                where: {
                    id: req.body.id
                }
            }).then(data => {
                res.json(data);
            }).catch(err => res.status(422).json(err));
        })
    }
}