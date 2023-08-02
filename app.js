
 // starting with express after insalling express by this command (npm install --save express)
const path = require('path');

const express = require('express');  // installed body praser for this (npm install --save body-parser)
const bodyParser = require('body-parser'); 

const errorController = require('./controllers/error');

const sequelize = require('./util/database');
// product and user models
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// anonymous middleware for incoming requests (this will only be called after listen is run )
app.use((req,res,next) => {
    User.findByPk(1)
        .then(user=>{                        // here user is a sequelize object with data of database in it.
            req.user = user;                 // we can add new field to req if it is not overriding an existing one.
            next();
        })
        .catch((err) => {console.log(err);});
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// to create table in database w.r.t the define statements there (in models)

sequelize.authenticate()
 .then((result)=> console.log('Connection has been established successfully.'))
.catch ((error) =>{
  console.error('Unable to connect to the database:', error);
});


// product and user association
Product.belongsTo(User,{constraints:true,onDelete: 'CASCADE'});
User.hasMany(Product);

// user and cart association
User.hasOne(Cart);
Cart.belongsTo(User);

// cart and product association
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});         // single product can be part of multiple carts

// user and order association
Order.belongsTo(User);
User.hasMany(Order);

// order and product association
Order.belongsToMany(Product,{through:OrderItem});



sequelize
    //.sync({force: true})
    .sync()
    .then(result =>{
        return User.findByPk(1);      // dummy user
        //console.log(result);
    })
    .then(user => {
        if(!user){
            return User.create({name:'zoro',email:'zoro@gmail.com'});
        }
        return user;
    })
    .then(user=>{
        // console.log(user);
        return user.createCart();
    })
    .then(cart=>{
        app.listen(8000);
    })
    .catch(err => {

        console.log(err);
    });        

 

// (npm install --save mysql2) for using sql in node 
// to connect node to database createxite a new folder in util folder in the project
// (npm install --save sequelize)
