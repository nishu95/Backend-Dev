// for database system
const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)',
    [this.title,this.price,this.description,this.imageUrl] );
  }

  static deleteproductbyID(id) {
    return db.execute('DELETE FROM products WHERE products.id=?',[id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');      // returning, so we can use this promise somewhere else
  }


  static findById(id){
    return db.execute('SELECT * FROM products WHERE products.id=?',[id]);
  }

};




/*
// for file system
const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id){  // if product already exists (edit/update operation)
        const existingProductIndex = products.findIndex(prod => prod.id===this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex]=this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      }
      else{
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static deleteproductbyID(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p,JSON.stringify(updatedProducts),err => {
        if(!err){
          Cart.deleteProductbyID(id,product.price);
        }
      })
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }


  static findById(id,cb){
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
*/
