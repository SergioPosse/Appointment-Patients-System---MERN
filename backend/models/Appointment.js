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
  acomplishDate: {
    type: Date,
    required:true
  },
  time: {
    type: String,
    validate: {
      isAsync: true,
      validator: function(v, cb) {
        setTimeout(function() {
          var timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;
          var msg = v + ' is not a valid time format!';

          cb(timeRegex.test(v), msg);
        }, 5);
      },

      message: 'Default error message'
    },
    required: [true, 'Time is required']
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