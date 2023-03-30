const express=require('express');
const path=require('path');
const rootDir=require('../util/path');
const router = express.Router();
const controller = require('../controllers/contactcontroller');


// /admin/add-product =>GET
router.get('/contact',controller.getContact);

// /admin/add-product =>POST
router.post('/contact',controller.postContact);

module.exports=router;