const express=require('express');
const controllers = require('../controllers/projectControllers');
const router = express.Router();

router.get('/admin',controllers.getController);
router.post('/admin',controllers.postController);
router.delete('/delete/:id', controllers.deleteController);
router.get('/buy1/:id', controllers.buy1Controller);
router.get('/buy2/:id', controllers.buy2Controller);
router.get('/buy3/:id', controllers.buy3Controller);

module.exports = router;
