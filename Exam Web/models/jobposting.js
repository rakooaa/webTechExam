const sequelize = require('../sequelize');
const {DataTypes} = require('sequelize');
const Candidate = require('./candidate');

const JobPosting = sequelize.define("JobPosting", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.STRING,
        validate: {
            len: [3,20]
        }
    },
    deadline: {
        type: DataTypes.DATE
    }
})

JobPosting.hasMany(Candidate)

module.exports = JobPosting