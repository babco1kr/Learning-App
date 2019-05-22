const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports = {
    //create a new teacher from sign-up page
    create: function(req, res) {

        //salt and encrypt new password
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                req.body.password = hash;

                //save user to database
                db.User
                .create(req.body)
                .then(results => res.json(results))
                .catch(err => res.status(422).json(err));
            });
        });
      },

      //check if teacher logged in correctly and issue json web token
      lookUp: function(req, res) {
        let currentUser;
        //find user
        db.User.findAll({
          where: {
            name: req.body.name,
            school: req.body.school
          }
        }).then(user => {
          currentUser = user[0].dataValues;
          //compare password provided vs database
         return bcrypt.compare(req.body.password, user[0].dataValues.password); 
      }).then(results => {
        if(!results) {
          return res.status(401).json({
            message: "Incorrect Login Credentials"
          })
        }
        //issue json webtoken
        const token = jwt.sign({name: currentUser.name, teacherId: currentUser.id}, `${process.env.JWT_SECRET}`, {expiresIn: '1h'});
        //json webtoken as well as name, teacherId, and schoolId to be saved in local storage.
        res.status(200).json({
          token: token,
          name: currentUser.name,
          teacherId: currentUser.id,
          schoolId: currentUser.school,
          expiresIn: 3600
        })
      })
      .catch(err => {
        return res.status(401).json({
          error: err
        })
      })
  },

  getProfile: function(req, res) {
    //verify the json web token
    let decoded = jwt.verify(req.body.data.token, `${process.env.JWT_SECRET}`)

    db.User.findAll({
      where: {
        name: decoded.name
      }

    }).then(user => {
      if (user) {
        let currentUser = user[0].dataValues;
        //shows that it's been decoded
        res.json(currentUser);
      } else {
        res.send("User does not exist");
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });

    const checkToken = (req, res, next) => {
      const header = req.headers['authorization'];
  
      if(typeof header !== 'undefined') {
          const bearer = header.split(' ');
          const token = bearer[1];
  
          req.token = token;
          next();
      } else {
          //If header is undefined return Forbidden (403)
          res.sendStatus(403)
      }

  }


  }
}