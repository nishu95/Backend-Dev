const express = require('express');
const app = express();
const sequelize = require('./utils/database');
const cors = require('cors');
const projectRoute = require('./routes/expenseRoutes');
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

app.use(projectRoute);

sequelize.sync()
    .then(()=>{
        console.log("table created successfully");
        app.listen(7100);
    })
    .catch((err)=>{console.log(err);})

