const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const jwt = require("jsonwebtoken");

// API Routes. Sends to routes/api/index.js
router.use("/api", apiRoutes);



//Check to make sure header is not undefined, if so, return Forbidden (403)
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


router.get("/user/data", checkToken, (req, res) => {
  //verify the JWT token generated for the user
  jwt.verify(req.token, `${process.env.JWT_SECRET}`, (err, authorizedData) => {
      if(err){
          //If error send Forbidden (403)
          console.log('ERROR: Could not connect to the protected route');
          res.sendStatus(403);
      } else {
          //If token is successfully verified, we can send the autorized data 
          res.json({
              message: 'Successful log in',
              authorizedData
          });
          console.log('SUCCESS: Connected to protected route');
      }
  })
});



// If no API routes are hit, send the React app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
  
  module.exports = router;