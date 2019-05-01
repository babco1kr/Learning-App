module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        school: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    User.associate = function(models) {
        User.hasMany(models.Student, {
            onDelete: "cascade"
        });
    };
    return User;
};
