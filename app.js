
 // starting with express after insalling express by this command (npm install --save express)
const path = require('path');

const express = require('express');  // installed body praser for this (npm install --save body-parser)
const bodyParser = require('body-parser'); 

const errorController = require('./controllers/error');

const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// to create table in database w.r.t the define statements there (in models)

sequelize.authenticate()
 .then((result)=> console.log('Connection has been established successfully.'))
.catch ((error) =>{
  console.error('Unable to connect to the database:', error);
});

sequelize
    .sync({force:true})
    .then(result =>{
        //console.log(result);
        app.listen(8000);
    })
    .catch(err => {
        console.log(err);
    });        

 

// (npm install --save mysql2) for using sql in node 
// to connect node to database createxite a new folder in util folder in the project
// (npm install --save sequelize)
