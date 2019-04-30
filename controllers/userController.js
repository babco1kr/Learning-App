const db = require("../models");
const bcrypt = require('bcrypt');

module.exports = {
    create: function(req, res) {

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                console.log(hash);
                req.body.password = hash;

                db.User
                .create(req.body)
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(422).json(err));
            });
        });
      },

      lookUp: function(req, res) {

        // res.json(req.body);
        db.User.findAll({
          where: {
            name: req.body.name
          }
        }).then(function (result) {
          res.json(result);
        })

        // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
            
        // })


      }


};