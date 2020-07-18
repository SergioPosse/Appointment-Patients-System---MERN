const mongoose = require('mongoose');
const { Schema } = mongoose;

const HealthinsuranceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  official_site: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Healthinsurance', HealthinsuranceSchema);