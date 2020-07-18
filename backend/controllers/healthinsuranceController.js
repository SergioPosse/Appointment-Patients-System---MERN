const Healthinsurance = require('../models/Healthinsurance');
const healthinsuranceController = {};

healthinsuranceController.getHealthinsurances = async (req,res) => { 
    const healthinsurances = await Healthinsurance.find({})
    res.json(healthinsurances);
};

healthinsuranceController.getHealthinsurance = (req,res) => { 
    res.json( {message: "GET getHealthinsurance"} )
};

healthinsuranceController.createHealthinsurance = async (req,res) => { 
    const { name, official_site } = req.body;

    const newHealthinsurance = new Healthinsurance({
        name: name,
        official_site: official_site
    });

    await newHealthinsurance.save();
    res.json({message: 'New Healthinsurance Saved Suceffully'});
};

healthinsuranceController.editHealthinsurance = (req,res) => { 
    res.json( {message: "EDIT editHealthinsurance"} )
};

healthinsuranceController.deleteHealthinsurance = (req,res) => { 
    res.json( {message: "DELETE deleteHealthinsurance"} )
};

module.exports = healthinsuranceController;