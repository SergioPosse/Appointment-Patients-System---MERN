const Doctor = require('../models/Doctor');
const doctorController = {};

doctorController.getDoctors = async (req,res) => { 
    const doctors = await Doctor.find({})
    res.json(doctors);
};

doctorController.getDoctor = (req,res) => { 
    res.json( {message: "GET getDoctor"} )
};

doctorController.createDoctor = async (req,res) => { 
    const { name, speciality } = req.body;

    const newDoctor = new Doctor({
        name: name,
        speciality: speciality
    });

    await newDoctor.save();
    res.json({message: 'New Doctor Saved Suceffully'});
};

doctorController.editDoctor = (req,res) => { 
    res.json( {message: "EDIT editDoctor"} )
};

doctorController.deleteDoctor = (req,res) => { 
    res.json( {message: "DELETE deleteDoctor"} )
};

module.exports = doctorController;