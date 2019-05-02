const router = require("express").Router();
const studentController = require("../../controllers/studentController");

router.route("/")
    //sends to controllers/userController.js
  .post(studentController.login)

module.exports = router;