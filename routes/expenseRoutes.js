const express=require('express');
const expense_controller = require('../controllers/expenseControllers');
const router=express.Router();

router.get('/expense',expense_controller.getExpense);

router.post('/expense',expense_controller.postExpense);

router.get('/edit/:userId',expense_controller.editExpense);

router.delete('/delete/:userId',expense_controller.deleteExpense);

module.exports=router;

