const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

const moment = require('moment');
const { MongooseDocument } = require('mongoose');

const appointmentController = {};

appointmentController.getAppointments = async (req,res) => { 
    const appointments = await Appointment.find({})
    console.log("server: "+appointments)
    res.json(appointments);
};

appointmentController.getAppointment = (req,res) => { 
    const id = req.params.id;
    const appointment = Appointment.findById(id);
    res.json( appointment )
};

appointmentController.createAppointment = async (req,res) => { 
    const { doctor, patient, description, acomplishDate } = req.body;
    //how to pass the patients and doctor object from the frontend???
    const newAppointment = new Appointment({
        patient: patient,
        doctor: doctor,
        agreedDate: moment.now(),
        description: description,
        acomplishDate: acomplishDate,
        state: false
    });

    try{
        await newAppointment.save();
        res.json({message: 'New Appoinment Saved Suceffully'});
    }catch(error){
        res.status(403).json({message: error})
    }
    
};

appointmentController.editAppointment = (req,res) => { 
    res.json( {message: "EDIT editTurn"} )
};

appointmentController.deleteAppointment = (req,res) => { 
    res.json( {message: "DELETE deleteTurn"} )
};

module.exports = appointmentController;