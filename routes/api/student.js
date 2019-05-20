const router = require("express").Router();
const studentController = require("../../controllers/studentController");

router.route("/")
    //sends to controllers/studentController.js
  .post(studentController.login);

router.route("/start")
  .post(studentController.logStart);

router.route("/end")
  .post(studentController.logEnd);

router.route("/lookup")
.post(studentController.lookup);

router.route("/getquestions")
.post(studentController.getQuestions);

router.route("/loganswer")
.post(studentController.logAnswer);

router.route("/tts")
.post(studentController.tts);


module.exports = router;