const db = require("../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    // Makes a new student in the database
    createStudent: function(req, res) {
        db.Student.create(req.body)
        .then(results => res.json(results))
        .catch(err =>res.status(422).json(err));
    },

    // Finds all students based of the teachers ID and the school ID
    findStudents: function(req, res) {
        db.Student.findAll({
            where: {
                UserId: req.body.UserId,
                school: req.body.school
            }
        }).then(results => {res.json(results)})
        .catch(err => res.status(422).json(err));
    },

    // Adds unit to database
    addUnit: function(req, res) {
        db.Unit.create(req.body)
        .then(results => res.json(results))
        .catch(err => res.status(422).json(err));
    },

    // Adds spelling word to the database
    addSpelling: function(req, res) {
        db.Spelling.create(req.body)
        .then(results => res.json(results))
        .catch(err => res.status(422).json(err));
    },

    // Finds all units based on the teacher ID and school ID
    findUnits: function(req, res) {
        db.Unit.findAll({
            where: {
                teacherID: req.body.teacherID,
                school: req.body.school
            }
        }).then(results => {
            res.json(results)
        }).catch(err => res.status(422).json(err));
    },

    // Changes the active state for the Unit clicked
    updateActive: function(req, res) {
        let newState;
        db.Unit.findAll({
            where: {
                id: req.body.unitId,
                teacherID: req.body.teacherID,
                school: req.body.school
            }
        }).then(results => {
            // Checks the current state of active
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

    // Removes Student from the database and all results attatched to that student
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

    // Removes Unit from the database
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

    // Finds all questions in based on the unit ID
    findQuestions: function(req, res) {
        db.Spelling.findAll({
            where: {
                UnitId: req.body.UnitId
            }
        }).then(data => {
            res.json(data)
        })
    },

    // Deletes a question from the database
    deleteQuestion: function(req, res) {
        db.Spelling.destroy({
            where: {
                id: req.body.id
            }
        }).then(results => {
            res.json(results);
        })
    },

    // Finds all units that are currently active for that teacher
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

    // Finds all scores for students belonging to that teacher and for only active units
    getResults: function(req, res) {
        let length = req.body.unitId.length;
        let units = [];
        for (let i = 0; i < length; i ++) {
            units.push([{unitID: req.body.unitId[i]}]);
        }
        db.Score.findAll({
            where: {
                teacherID: req.body.UserId,
                [Op.or]: units
            }
        }).then(results => {
            res.json(results);
        })
    },

    // Finds all the questions for the active units for checking to see who has completed the assignment
    findTotalQuestions: function(req, res) {
        let length = req.body.unitId.length;
        let units = [];
        for (let i = 0; i < length; i ++) {
            units.push([{UnitId: req.body.unitId[i]}]);
        }
        db.Spelling.findAll({
            where: {
                [Op.or]: units
            }
        }).then(results => {
            res.json(results);
        })
    }
}