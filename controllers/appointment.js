const appointmentData = require('../models/user');
const path = require('path');

exports.getAppointment = async (req,res,next) =>{
    try{
        const user = await appointmentData.findAll()
        console.log(user);
        res.json(user);            // sending JSON response when hit 
        // res.sendFile(path.join(__dirname,'..','views','appointment.html'));     // respond to this html page

    }catch(err){console.log(err);}
    
        
};

exports.insertUser = async (req,res,next) =>{
    try{
        const singleAppointment={
            userName: req.body.name,
            phoneNumber: req.body.phone,
            email: req.body.email
        }
    
        const data = await appointmentData.create({...req.body});
        res.json(data);           // this data is what we are sending to frontend

    }
    catch(err){console.log(err);}

};

exports.deleteUser = async(req,res,next)=>{
    const userId = req.params.userId;
    try{
        const user = await appointmentData.findByPk(userId);
        user.destroy();
        res.sendStatus(200);
    }catch(err){console.log(err);}
}

exports.editUser = async (req,res,next)=>{
    const userId = req.params.userId;
    try{
        const user = await appointmentData.findByPk(userId);
        res.json(user);
    }catch(err){console.log(err);}
}



