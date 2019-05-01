module.exports = function (sequelize, DataTypes) {
    var Score = sequelize.define("Score", {
        question: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        correct: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        questionID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        teacherID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unitID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    });
    Score.associate = function(models) {
        Score.belongsTo(models.Student, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Score;
};