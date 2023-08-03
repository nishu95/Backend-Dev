const dataTable = require('../models/projectModel');

exports.getController = async (req,res,next) => {
    try{
        const response = await dataTable.findAll();
        res.json(response);
    }
    catch(err){console.log(err);}
};

exports.postController = async (req,res,next) => {
    try{
        const response = await dataTable.create({...req.body});
        res.json(response);
    }
    catch(err){console.log(err);} 
};

exports.deleteController = async (req,res,next) => {
    const userId = req.params.id;
    try{
        const response = await dataTable.findByPk(userId);
        response.destroy();
        res.sendStatus(200);
    }
    catch(err){console.log(err);}
};


exports.buy1Controller = async (req,res,next) => {
    const userId = req.params.id;
    try{
        const response=await dataTable.findByPk(userId)
            .then(data=>{
                if(data.quantity>10){
                    data.quantity=data.quantity-1;
                    data.update({quantity: data.quantity});
                } 
            })
            .catch(err => {console.log(err);});

        // const response = await dataTable.findByPk(userId);
        console.log("controller response is:",response);
        // const quant= response.quantity;
        // console.log("quantity is:",quant);
        res.json(response);
    }
    catch(err){console.log(err);}
};

exports.buy2Controller = async (req,res,next) => {
    const userId = req.params.id;
    try{
        const response =await dataTable.findByPk(userId)
            .then(data=>{
                if(data.quantity>10){
                    data.quantity=data.quantity-2;
                    data.update({quantity: data.quantity});
                } 
            })
            .catch(err => {console.log(err);});

        // const response = await dataTable.findByPk(userId);
        console.log("controller response is:",response);
        // const quant= response.quantity;
        // console.log("quantity is:",quant);
        res.json(response);
    }
    catch(err){console.log(err);}
};

exports.buy3Controller = async (req,res,next) => {
    const userId = req.params.id;
    try{
        const response =await dataTable.findByPk(userId)
            .then(data=>{
                if(data.quantity>10){
                    data.quantity=data.quantity-3;
                    data.update({quantity: data.quantity});
                } 
            })
            .catch(err => {console.log(err);});

        // const response = await dataTable.findByPk(userId);
        console.log("controller response is:",response);
        // const quant= response.quantity;
        // console.log("quantity is:",quant);
        res.json(response);
    }
    catch(err){console.log(err);}
};