const router = require("express").Router();
const userRoutes = require("./user");
const userLookupRoutes = require("./userlookup.js");

// sends to routes/api/user.js
router.use("/user", userRoutes);
router.use("/userlookup", userLookupRoutes);

module.exports = router;
