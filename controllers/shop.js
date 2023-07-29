const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');



exports.getProducts = (req, res, next) => {
  Product.findAll()                          // this is sequelize findAll method
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err=>console.log(err)); 
};


exports.getProduct = (req,res,next) => {
  const prodId = req.params.productId; 
  console.log(prodId);

  Product.findByPk(prodId)         // this is sequelize findByPk method
    .then(product =>{
      res.render("shop/product-detail",{
        product: product,
        pageTitle: product.title,
        path:'/products'
      });
    })
    .catch(err=>console.log(err));


  // Product.findAll({where:{id:prodId}})         // this is sequelize findAll method for the same
  //   .then(products =>{                         // this gives array of products
  //     res.render("shop/product-detail",{
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path:'/products'
  //     });
  //   })
  //   .catch(err=>console.log(err));
  
  //res.redirect('/');
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
     });
    })
    .catch(err=>console.log(err));
};

exports.getCart = (req, res, next) => {
  console.log(req.user.cart);
  req.user.getCart()         // sequelize method associated with user
    .then(cart => {
      // console.log(cart);
      return cart.getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products

          });
        })
        .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err));

  
};

exports.postCart = (req,res,next) => {
  const prodId=req.body.productId;
  let fetchedCart;
  let newQuantity=1;

  req.user
    .getCart()
    .then(cart=>{
      // is the product already in cart?
      fetchedCart=cart;
      return cart.getProducts({where: {id: prodId}});           // returns array
    })
    .then(products=>{
      let product;
      if(products.length > 0){
        product = products[0];
      }
      if(product){         // if product already exist in the cart
        const oldQuantity=product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId)
    })
    .then(product=>{
      return fetchedCart.addProduct(product, { through : {quantity : newQuantity}});
    })
    .then(()=>{
      res.redirect('/cart');
    })
    .catch(err=>console.log(err));


  
};

exports.postCartDeleteProduct = (req,res,next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart=>{
      return cart.getProducts({where:{id:prodId}})
    })
    .then(products => {
      const product=products[0];
      return product.cartItem.destroy();            // delete the product from cart-item table
    })
    .then(result=>{
      res.redirect('/cart');
    })
    .catch(err=>console.log(err));

  
};

exports.postOrder = (req,res,next)=>{
  let fetchedCart;
  req.user
    .getCart()
    .then(cart=>{
      fetchedCart=cart;
      return cart.getProducts();
    })
    .then(products=>{
      return req.user.createOrder()
        .then(order=>{
          return order.addProducts(products.map(product=>{
            product.orderItem = {quantity: product.cartItem.quantity};           // quantity from cartItem table for a product is copied to product in orderItem table
            return product;
          }))
        })
        .catch(err=>console.log(err));
      // console.log(products);
    })
    .then(result=>{
      return fetchedCart.setProducts(null);               // emptied cart after order is done
    }) 
    .then(result=>{
      res.redirect('/orders');
    })
    .catch(err=>console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({include: ['products']})                  // sequelize method to get all the orders and also the products related to them
    .then(orders=>{
      // console.log(orders);
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders:orders
      });
    })
    .catch(err=>console.log(err));
  
};


