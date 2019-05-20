module.exports = function (sequelize, DataTypes) {
    var Student = sequelize.define("Student", {
        studentNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        school: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.STRING,
            default: null
        },
        endTime: {
            type: DataTypes.STRING,
            default: null
        }
    });
    Student.associate = function(models) {
        Student.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    Student.associate = function(models) {
        Student.hasMany(models.Score, {
            onDelete: "cascade"
        });
    };
    return Student;
};