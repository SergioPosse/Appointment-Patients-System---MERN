const Appoinment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

const moment = require('moment');
const { MongooseDocument } = require('mongoose');

const appointmentController = {};

appointmentController.getAppointments = async (req,res) => { 
    const appointments = await Appoinment.find({})
    res.json(appoinments);
};

appointmentController.getAppointment = (req,res) => { 
    res.json( {message: "GET getTurn"} )
};

appointmentController.createAppointment = async (req,res) => { 
    const { doctor, patient, description } = req.body;
    //how to pass the patients and doctor object from the frontend???
    const newAppointment = new Appointment({
        patient: patient._id,
        doctor: doctor._id,
        agreedDate: moment.now(),
        description: description,
        state: false
    });

    await newAppointment.save();
    res.json({message: 'New Appoinment Saved Suceffully'});
};

appointmentController.editAppointment = (req,res) => { 
    res.json( {message: "EDIT editTurn"} )
};

appointmentController.deleteAppointment = (req,res) => { 
    res.json( {message: "DELETE deleteTurn"} )
};

module.exports = appointmentController;