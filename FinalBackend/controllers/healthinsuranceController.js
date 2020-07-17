const healthinsuranceController = {};

healthinsuranceController.getHealthinsurances = (req,res) => { 
    res.json( {message: "GET getHealthinsurances"} )
};

healthinsuranceController.getHealthinsurance = (req,res) => { 
    res.json( {message: "GET getHealthinsurance"} )
};

healthinsuranceController.createHealthinsurance = (req,res) => { 
    res.json( {message: "POST createHealthinsurance"} )
};

healthinsuranceController.editHealthinsurance = (req,res) => { 
    res.json( {message: "EDIT editHealthinsurance"} )
};

healthinsuranceController.deleteHealthinsurance = (req,res) => { 
    res.json( {message: "DELETE deleteHealthinsurance"} )
};

module.exports = healthinsuranceController;