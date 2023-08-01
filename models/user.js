const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const appointmentData = sequelize.define('user',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    phoneNumber:{
        type: Sequelize.STRING,
        unique: true
    },
    email:{
        type: Sequelize.STRING,
        unique: true
    }
});

module.exports = appointmentData;