
/*
// const products=[];
const fs = require('fs');
const path = require('path');

module.exports = class Product {
    constructor(t){
        this.title=t;
    }

    save() {
        // products.push(this);
        const p = path.join(path.dirname(require.main.filename),'data','products.json');
        fs.readFile(p,(err,fileContent)=>{
            let products=[];
            if(!err){
                products = JSON.parse(JSON.stringify(fileContent));
            }
            products.push(this); // error
            fs.writeFile(p,JSON.stringify(products) , err=>{
                console.log(err);
            });
        });
    }

    static fetchAll(cb){   // cb is callback function
        const p = path.join(path.dirname(require.main.filename),'data','products.json');
        fs.readFile(p,(err,fileContent)=>{
            console.log("this is the  file content");
            console.log(fileContent);
            if(err){
                // return [];
                console.log("json file is empty");
                cb([]);

            }
            // return JSON.parse(fileContent);
            else{
            cb(JSON.parse(JSON.stringify(fileContent)));
            }
        });
    }
}
*/

const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
);

const getProductsFromFile = cb =>{
    
      fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        }
        else{
            cb(JSON.parse(fileContent));
        }
        
      });
}

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile(products =>{
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};

