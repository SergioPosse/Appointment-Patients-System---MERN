const patientController = {};

patientController.getPatients = (req,res) => { 
    res.json( {message: "GET getPatients"} )
};

patientController.getPatient = (req,res) => { 
    res.json( {message: "GET getPatient"} )
};

patientController.createPatient = (req,res) => { 
    res.json( {message: "POST createPatient"} )
};

patientController.editPatient = (req,res) => { 
    res.json( {message: "EDIT editPatient"} )
};

patientController.deletePatient = (req,res) => { 
    res.json( {message: "DELETE deletePatient"} )
};

module.exports = patientController;