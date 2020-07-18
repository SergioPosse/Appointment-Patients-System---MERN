const Patient = require('../models/Patient');
const patientController = {};

patientController.getPatients = async (req,res) => { 
    const patients = await Patient.find({})
    res.json(patients);
};

patientController.getPatient = (req,res) => { 
    res.json( {message: "GET getPatient"} )
};

patientController.createPatient = async (req,res) => { 
    const { name, dni, tel, healthinsurance } = req.body;

    const newPatient = new Patient({
        name: name,
        dni: dni,
        tel: tel,
        healthinsurance: healthinsurance._id
    });

    await newPatient.save();
    res.json({message: 'New Patient Saved Suceffully'});
};

patientController.editPatient = (req,res) => { 
    res.json( {message: "EDIT editPatient"} )
};

patientController.deletePatient = (req,res) => { 
    res.json( {message: "DELETE deletePatient"} )
};

module.exports = patientController;