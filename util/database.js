// in terminal do (npm install --save mysql2)

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node_complete',
//     password:'admin'
// });

// module.exports = pool.promise();

/* connecting to sequelize */

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete','root','admin',{
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;