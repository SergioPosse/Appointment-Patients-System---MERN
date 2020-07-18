const mongoose = require('mongoose');
const { Schema } = mongoose;

const PatientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dni: {
    type: String,
    required: true
  },
  tel:{
      type: String,
  },
  healthinsurance: {
      type: Schema.Types.ObjectId,
      ref: "Healthinsurance"
  } 
});

module.exports = mongoose.model('Patient', PatientSchema);