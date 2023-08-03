const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ProjectData = sequelize.define('inventory_table',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    itemname:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type:Sequelize.STRING,
        allowNull: false
    },
    price:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = ProjectData;