const db = require("../models");

module.exports = {
    login: function (req, res) {
        db.Student.findAll({
            where: {
                studentNumber: req.params.id
            }
        })
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err));
    }
}