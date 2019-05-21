const router = require("express").Router();
const userRoutes = require("./user");
const studentRoutes = require("./student");
const teacherRoutes = require("./teacher");

router.use("/user", userRoutes);
router.use("/login", userRoutes);
router.use("/student", studentRoutes);
router.use("/teacher", teacherRoutes)

module.exports = router;
