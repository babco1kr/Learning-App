const router = require("express").Router();
const userRoutes = require("./user");

// sends to routes/api/user.js
router.use("/user", userRoutes);

module.exports = router;
