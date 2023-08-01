const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const projectRoutes = require('./routes/appointment_routes');
var cors=require('cors');

app.use(cors());
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(projectRoutes);

sequelize.sync()
    .then(()=>{
        console.log("table created successfully");
        app.listen(7000);
    })
    .catch(err=>{console.log("unable to connect to database:",err)});
    

    

