const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const withAuth = require("../middleware/middleware");

// API Routes. Sends to routes/api/index.js
router.use("/api", apiRoutes);

// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Auth0 Webapp sample Nodejs' });
// });


// temporary place to put a route that invokes the middleware.
// Checks jwt
// router.get('/secret', withAuth, function(req, res) {
//   res.send('The password is potato');
// });

// If no API routes are hit, send the React app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
  
  module.exports = router;