module.exports = function (sequelize, DataTypes) {
    var Unit = sequelize.define("Unit", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        teacherID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        school: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        subject: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Unit.associate = function(models) {
        Unit.hasMany(models.Spelling, {
            onDelete: "cascade"
        });
    };
    return Unit;
};