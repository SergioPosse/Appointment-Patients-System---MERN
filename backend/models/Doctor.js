const mongoose = require('mongoose');
const { Schema } = mongoose;

const DoctorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  speciality: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Doctor', DoctorSchema);