const router = require("express").Router();
const userRoutes = require("./user");
// const userLookupRoutes = require("./userlookup.js");
const studentRoutes = require("./student");
const teacherRoutes = require("./teacher");

// const ttsRoutes = require("./texttospeech");


// sends to routes/api/user.js
router.use("/user", userRoutes);


router.use("/login", userRoutes);

router.use("/student", studentRoutes);
router.use("/teacher", teacherRoutes)

// router.use("/texttospeech", ttsRoutes)


module.exports = router;
