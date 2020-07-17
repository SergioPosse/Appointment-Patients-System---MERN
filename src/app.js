const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const  { Router } = require('express');
const router = Router();

var env = require('node-env-file'); // .env file
env(__dirname + '/.env');

//settings


app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//middlewares (antes que llegue a las rutas ejecuto esto)
app.use(morgan('dev')); //para ver peticiones en consola que realizan usuarios
app.use(cors());

//static
//app.use(express.static(path.join(__dirname, 'public'))); //uso path para unir __dirname y el nombre de mi public folder
//esto es necesario porque linux y windows no usan los mismos slashes para las rutas, path nos evita eso


//ENDPOINTS

app.get('/medical-care-rioiv/',(req,res)=>{
    res.send('get /medical-care-rioiv/');
});




module.exports = app;