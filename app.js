const express = require('express');
const app=express();
const sequelize = require('./models/projectModel');
const projectRoute = require('./routes/projectRoutes');
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({extended:false}));
app.use(projectRoute);

sequelize
    //.sync({force:true})
    .sync()
    .then(()=>{
        console.log("table has been created");
        app.listen(7200);
    })
    .catch(err=>{console.log(err)})