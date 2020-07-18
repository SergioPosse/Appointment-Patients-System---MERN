const turnController = {};

turnController.getTurns = (req,res) => { 
    res.json( {message: "GET getTurns"} )
};

turnController.getTurn = (req,res) => { 
    res.json( {message: "GET getTurn"} )
};

turnController.createTurn = (req,res) => { 
    res.json( {message: "POST createTurn"} )
};

turnController.editTurn = (req,res) => { 
    res.json( {message: "EDIT editTurn"} )
};

turnController.deleteTurn = (req,res) => { 
    res.json( {message: "DELETE deleteTurn"} )
};

module.exports = turnController;