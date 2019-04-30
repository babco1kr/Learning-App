const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

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
        let currentUser;
        // res.json(req.body);
        db.User.findAll({
          where: {
            name: req.body.name
          }
        }).then(user => {
          currentUser = user[0].dataValues;
          // console.log(user[0].dataValues.password);
         return bcrypt.compare(req.body.password, user[0].dataValues.password); 
      }).then(results => {
        // console.log(results);
        if(!results) {
          return res.status(401).json({
            message: "Incorrect Login Credentials"
          })
        }

        // const token = jwt.sign({
        //   id: currentUser.id,
        //   name: currentUser.name,
        //   school: currentUser.school
        // });
        // console.log(token);
      })
    }


};