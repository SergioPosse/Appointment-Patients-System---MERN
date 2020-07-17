const mongoose = require('mongoose');

const URI = process.env.MONGOATLAS_URI
mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true} )
  .then(db => console.log('DB CONNECTED'))
  .catch(err => console.error(err));

module.exports = mongoose