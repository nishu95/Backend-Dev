const expenseData = require('../models/expense');

exports.getExpense = async (req,res,next) => {
    try{
        const expenses = await expenseData.findAll();
        res.json(expenses);
    }catch(err){console.log(err);}
}

exports.postExpense = async (req,res,next) => {
    console.log("req.body is:",req.body);
    try{
        const singleExpense={
            expense:req.body.exp,
            description:req.body.desc,
            category:req.body.cat 
        }

        const newExpense = await expenseData.create({...req.body});
        res.json(newExpense);

    }catch(err){console.log(err);}
}

exports.editExpense = async (req,res,next) => {
    const userId = req.params.userId;
    try{
        const editExpense = await expenseData.findByPk(userId);
        res.json(editExpense);
    }catch(err){console.log(err);}
}

exports.deleteExpense = async (req,res,next) => {
    const userId = req.params.userId;
    try{
        const deleteExp = await expenseData.findByPk(userId);
        deleteExp.destroy();
        res.sendStatus(200);
    }catch(err){console.log(err);}
}

