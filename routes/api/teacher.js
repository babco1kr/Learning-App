const router = require("express").Router();
const teacherController = require("../../controllers/teacherController");

router.route("/")
    //sends to controllers/teacherController.js
  .post(teacherController.createStudent);

router.route("/lookup")
    //sends to controllers/teacherController.js
  .post(teacherController.findStudents);

router.route("/addUnit")
  .post(teacherController.addUnit);

router.route("/addSpelling")
  .post(teacherController.addSpelling)

router.route("/getUnits")
  .post(teacherController.findUnits);

router.route("/changestatus")
  .post(teacherController.updateActive);

router.route("/removestudent")
  .post(teacherController.deleteStudent);

router.route("/removeunit")
  .post(teacherController.deleteUnit);

router.route("/findquestions")
  .post(teacherController.findQuestions);

router.route("/removequestion")
  .post(teacherController.deleteQuestion);
  
module.exports = router;