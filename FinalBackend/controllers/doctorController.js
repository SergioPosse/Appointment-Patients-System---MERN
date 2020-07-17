const doctorController = {};

doctorController.getDoctors = (req,res) => { 
    res.json( {message: "GET getDoctors"} )
};

doctorController.getDoctor = (req,res) => { 
    res.json( {message: "GET getDoctor"} )
};

doctorController.createDoctor = (req,res) => { 
    res.json( {message: "POST createDoctor"} )
};

doctorController.editDoctor = (req,res) => { 
    res.json( {message: "EDIT editDoctor"} )
};

doctorController.deleteDoctor = (req,res) => { 
    res.json( {message: "DELETE deleteDoctor"} )
};

module.exports = doctorController;