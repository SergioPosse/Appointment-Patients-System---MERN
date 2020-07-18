const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppointmentSchema = new Schema({
  patient:{
    type: Schema.Types.ObjectId,
    ref: "Patient"
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor"
  },
  agreedDate: {
    type: Date,
    required: true
  },
  description:{
    type: String
  },
  state: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);