const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodetestproject1','root','admin',{
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;