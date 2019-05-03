const router = require("express").Router();
const teacherController = require("../../controllers/teacherController");

router.route("/")
    //sends to controllers/teacherController.js
  .post(teacherController.createStudent);


router.route("/lookup")
    //sends to controllers/teacherController.js
  .post(teacherController.findStudents);


module.exports = router;