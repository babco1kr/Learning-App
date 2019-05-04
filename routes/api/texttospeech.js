const router = require("express").Router();

const ttsController = require("../../controllers/ttsController");


router.route("/")
  .post(ttsController.sayWord);


module.exports = router;