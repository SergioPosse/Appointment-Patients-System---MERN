const mongoose = require('mongoose');

//the mongo atlas URI
const URI = "mongodb+srv://invitado:invitado@cluster0-ndgux.mongodb.net/jwtPractice?retryWrites=true&w=majority"

mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true} )
  .then(db => console.log('DB CONNECTED'))
  .catch(err => console.error(err));

module.exports = mongoose