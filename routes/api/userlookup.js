const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/")
    //sends to controllers/userController.js
  .post(userController.lookUp);

module.exports = router;