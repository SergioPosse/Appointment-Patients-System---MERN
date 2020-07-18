const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
var env = require('node-env-file'); // .env file
env(__dirname + '/.env');

//settings
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//middlewares (antes que llegue a las rutas ejecuto esto)
app.use(morgan('dev')); //para ver peticiones en consola que realizan usuarios
app.use(cors());

//routes
app.use('/medical-care-rioiv/patients', require('./routes/patientRoutes'))
app.use('/medical-care-rioiv/doctors', require('./routes/doctorRoutes'))
app.use('/medical-care-rioiv/appoinments', require('./routes/appointmentRoutes'))
app.use('/medical-care-rioiv/healthinsurances', require('./routes/healthinsuranceRoutes'))

module.exports = app;