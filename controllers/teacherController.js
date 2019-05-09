const db = require("../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
    },

    findQuestions: function(req, res) {
        db.Spelling.findAll({
            where: {
                UnitId: req.body.UnitId
            }
        }).then(data => {
            res.json(data)
        })
    },

    deleteQuestion: function(req, res) {
        db.Spelling.destroy({
            where: {
                id: req.body.id
            }
        }).then(results => {
            res.json(results);
        })
    },

    activeUnit: function(req, res) {
        db.Unit.findAll({
            where: {
                teacherID: req.body.UserId,
                school: req.body.school,
                active: true
            }
        }).then(results => {
            res.json(results);
        })
    },

    getResults: function(req, res) {
        let length = req.body.unitId.length;
        let units = [];
        for (let i = 0; i < length; i ++) {
            units.push([{unitID: req.body.unitId[i]}]);
        }
        // console.log(units);
        db.Score.findAll({
            where: {
                teacherID: req.body.UserId,
                [Op.or]: units
            }
        }).then(results => {
            res.json(results);
        })
    },

    findTotalQuestions: function(req, res) {
        let length = req.body.unitId.length;
        let units = [];
        for (let i = 0; i < length; i ++) {
            units.push([{UnitId: req.body.unitId[i]}]);
        }
        console.log(units);
        db.Spelling.findAll({
            where: {
                [Op.or]: units
            }
        }).then(results => {
            res.json(results);
        })
    }
}