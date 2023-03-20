const express=require('express');
const path=require('path');
const rootDir=require('../util/path');
const router = express.Router();

// /admin/add-product =>GET
router.get('/contact',(req,res,next)=>{
    console.log("in contact us middleware");
    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title" placeholder="product"><input type="text" name="size" placeholder="size"><button type="submit">Add Product</button></form>');
    res.sendFile(path.join(rootDir,'views','contact.html'));
});

// /admin/add-product =>POST
router.post('/contact',(req,res,next)=>{
    console.log(req.body);
    res.redirect("/success");
});

module.exports=router;