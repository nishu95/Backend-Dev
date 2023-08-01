const Sequelize=require('sequelize');

const sequelize = require('../utils/database');

const expenseData = sequelize.define('expense_tracker',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    expense:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports = expenseData;