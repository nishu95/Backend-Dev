const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense_tracker','root','admin',{
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;