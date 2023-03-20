const express = require('express');
const path=require('path');
const rootDir=require('../util/path');

const router = express.Router();

router.get('/success',(req,res,next)=>{
    console.log("in success middleware");
    // res.send('<h1> hello from express !</h1>');
    res.sendFile(path.join( rootDir, 'views' , 'success.html'));
});

module.exports = router;