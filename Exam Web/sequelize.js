const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sqlite/mydatabase.db'
})

sequelize.sync({
    force: true,
}).then(() =>{
    console.log("All models where syncronized succesfully");
})

module.exports = sequelize;