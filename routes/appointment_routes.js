const express=require('express');
const appointmentController = require("../controllers/appointment");
const router = express.Router();

router.get('/add-user',appointmentController.getAppointment);

router.post('/add-user',appointmentController.insertUser);

router.delete('/delete/:userId',appointmentController.deleteUser);

router.get('/edit/:userId',appointmentController.editUser);

module.exports=router;