
 // starting with express after insalling express by this command (npm install --save express)
const path = require('path');

const express = require('express');  // installed body praser for this (npm install --save body-parser)
const bodyParser = require('body-parser'); 

const errorController = require('./controllers/error');

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

app.listen(8000); 

// (npm install --save mysql2) for using sql in node
