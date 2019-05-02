const router = require("express").Router();
const studentController = require("../../controllers/studentController");

router.route("/:id")
    //sends to controllers/userController.js
  .get(studentController.login)

module.exports = router;