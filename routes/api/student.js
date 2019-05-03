const router = require("express").Router();
const studentController = require("../../controllers/studentController");

router.route("/")
    //sends to controllers/studentController.js
  .post(studentController.login);

router.route("/start")
  .post(studentController.logStart)


router.route("/lookup")
.post(studentController.lookup)


module.exports = router;