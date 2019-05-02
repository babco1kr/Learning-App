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
    }
}