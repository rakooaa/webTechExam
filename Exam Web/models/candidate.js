const sequelize = require('../sequelize');
const {DataTypes} = require('sequelize');

const Candidate = sequelize.define("Candidate", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        validate: {
            len: [5,20]
        }
    },
    cv: {
        type: DataTypes.TEXT,
        validate: {
            len: [10,20]
        }
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    }
})


module.exports = Candidate