const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  // manually creating a products for a user

  // Product.create({     
  //   title:title,
  //   imageUrl:imageUrl,
  //   price:price,
  //   description:description,
  //   userId:req.user.id
  // })

  // sequelize way of creating products for a user
  req.user
    .createProduct({                 // createProduct is a customized method given in association when association is specified (here user has many product that is why sequelize make 'createProduct' method to use)
      title:title,
      imageUrl:imageUrl,
      price:price,
      description:description
    })
    .then(result => {
      //console.log(result)
      console.log("Product created successfully");
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err)
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId= req.params.productId;
  req.user
    .getProducts({where: { id : prodId } } )                 // sequelize method
  // Product.findByPk(prodId)
    .then(products => {
      const product=products[0];
      if(!product){
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product:product
      });

    })
    .catch(err => {console.log(err)})
  
};

exports.postEditProduct = (req, res, next) => {
  const prodId= req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice= req.body.price;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle,
      product.imageUrl = updatedImageUrl,
      product.price = updatedPrice,
      product.description = updatedDesc
      return product.save()                 // this is a sequelize method to update the database
    })
    .then(result =>{                        // this then is for the product.save promise
      console.log("UPDATED PRODUCT!")
      res.redirect('/admin/products');
    })
    .catch(err => console.error(err));
  
};

exports.PostdeleteProduct = (req,res,next) => {
  const prodId=req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log("DESTROYED PRODUCT");
      res.redirect('/admin/products');
    })
    .catch(err => console.error(err));
  
}

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()         // sequelize method
    // Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err=>console.log(err));   
};
