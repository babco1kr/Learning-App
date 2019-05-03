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

module.exports = router;