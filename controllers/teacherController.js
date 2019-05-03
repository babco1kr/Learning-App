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
    }
}