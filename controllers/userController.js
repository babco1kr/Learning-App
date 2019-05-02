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
                .then(res => res.json(res))
                .catch(err => res.status(422).json(err));
            });
        });
      },

      lookUp: function(req, res) {
        let currentUser;
        // res.json(req.body);
        db.User.findAll({
          where: {
            name: req.body.name,
            school: req.body.school
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
        const token = jwt.sign({name: currentUser.name, userId: currentUser._id}, `${process.env.JWT_SECRET}`, {expiresIn: '1h'});
        console.log(token);
        res.status(200).json({
          token: token,
          name: currentUser.name,
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
    //req.body.data.token gets you the token out of the req.
  



    
    let decoded = jwt.verify(req.body.data.token, `${process.env.JWT_SECRET}`)
    console.log(decoded);

    db.User.findAll({
      where: {
        name: decoded.name
      }

    }).then(user => {
      if (user) {
        let currentUser = user[0].dataValues;
        //shows that it's been decoded
        console.log(currentUser);
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