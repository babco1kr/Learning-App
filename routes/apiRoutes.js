var db = require("../models");

module.exports = function (app) {

    const createUser = async ({ name, password }) => {
        return await db.User.create({ name, password });
    };
    
    const getAllUsers = async () => {
        return await db.User.findAll({});
    };

    app.get("/", function (req, res) {
        getAllUsers().then(user => res.json(user));
    });

    app.post("/register", function (req, res, next) {
        const { name, password } = req.body;
        createUser({ name, password }).then(user =>
            res.json({ user, msg: "account created successfully" })
        );
    });
}