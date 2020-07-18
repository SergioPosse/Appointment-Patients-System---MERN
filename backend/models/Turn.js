const mongoose = require('mongoose');
const { Schema } = mongoose;

const TurnSchema = new Schema({
  id: {
    type: Int16Array,
    required: true
  },
  doctor_id: {
    type: Int16Array,
    required: true
  },
  patient_id: {
    type: Int16Array,
    required: true
  },
  date_created: {
    type: Date,
    required: true
  },
  date_pacted: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  state: {
    type: Boolean,
    required: true
  },  
});

module.exports = mongoose.model('Turn', TurnSchema);