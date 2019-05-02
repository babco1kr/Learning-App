const router = require("express").Router();
const userRoutes = require("./user");
const userLookupRoutes = require("./userlookup.js");
const teacherRoutes = require("./teacher");

// sends to routes/api/user.js
router.use("/user", userRoutes);
router.use("/userlookup", userLookupRoutes);
router.use("/login", userLookupRoutes)
router.use("/teacher", teacherRoutes)

module.exports = router;
