module.exports = function (sequelize, DataTypes) {
    var Spelling = sequelize.define("Spelling", {
        question: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pictureLink: {
            type: DataTypes.STRING
        },
        teacherID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        school: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Spelling.associate = function(models) {
        Spelling.belongsTo(models.Unit, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Spelling;
};