const router = require("express").Router();
const userRoutes = require("./user");
// const userLookupRoutes = require("./userlookup.js");
const studentRoutes = require("./student");
const teacherRoutes = require("./teacher");


// sends to routes/api/user.js
router.use("/user", userRoutes);

// router.use("/login", userLookupRoutes);
router.use("/student", studentRoutes);
router.use("/teacher", teacherRoutes)


module.exports = router;
