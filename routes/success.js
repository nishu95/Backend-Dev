const express = require('express');
const path=require('path');
const rootDir=require('../util/path');
const controller = require('../controllers/successcontroller')

const router = express.Router();

router.get('/success',controller.getSuccess);

module.exports = router;