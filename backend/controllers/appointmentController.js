const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

const moment = require('moment');
const { MongooseDocument } = require('mongoose');

const appointmentController = {};

appointmentController.getAppointments = async (req,res) => { 
    const appointments = await Appointment.find({}).populate('doctor').populate('patient');
    console.log("server: "+appointments)
    res.json(appointments);
};

appointmentController.getAppointmentByDoctor = async(req,res) => { 
Appointment.
  find({ doctor: req.params.id }).
  populate('doctor').
  populate('patient').
  exec(function (err, appointment) {

        return res.json(appointment)
 
  });


};

appointmentController.createAppointment = async (req,res) => { 
    const { doctor, patient, description, acomplishDate, time} = req.body;
    //how to pass the patients and doctor object from the frontend???
    console.log("ento");
    const newAppointment = new Appointment({
        patient: patient,
        doctor: doctor,
        agreedDate: moment().format("YYYY-MM-DD"),
        description: description,
        acomplishDate: acomplishDate,
        time: time,
        state: false
    });

    try{
        await newAppointment.save();
        res.json({message: 'New Appoinment Saved Suceffully'});
    }catch(error){
        console.log("error interno: "+error);
    }
    
};

appointmentController.editAppointment = (req,res) => { 
    res.json( {message: "EDIT editTurn"} )
};

appointmentController.deleteAppointment = (req,res) => { 
    res.json( {message: "DELETE deleteTurn"} )
};

module.exports = appointmentController;