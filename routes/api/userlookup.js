const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/")
    //sends to controllers/userController.js
  .post(userController.lookUp);


router.route("/test")
  .post(userController.getProfile);

module.exports = router;