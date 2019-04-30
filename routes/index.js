const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes. Sends to routes/api/index.js
router.use("/api", apiRoutes);

// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Auth0 Webapp sample Nodejs' });
// });

// If no API routes are hit, send the React app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
  
  module.exports = router;