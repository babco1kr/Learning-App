const router = require("express").Router();

const ttsController = require("../../controllers/ttsController");


router.route("/")
    //sends to controllers/teacherController.js
  .post(ttsController.sayWord);


module.exports = router;