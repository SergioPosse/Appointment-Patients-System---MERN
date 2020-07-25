import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import DoctorList from './DoctorList'
import PatientList from './PatientList'
import Calendar from './Calendar'

function App() {

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState();

  const changeDoctor = (data) => {
    console.log(data)
    setSelectedDoctor(data);

  }
 
    useEffect( () => {

      const getData = async ()=>{
        const doctorsArr = await axios('http://localhost:666/medical-care-rioiv/doctors',);
        //not sure if the spread operator work like this in hooks
        //i read that a good practice is set a new copy of the previous state with a new copy of the data
        setDoctors(...doctors, ...[doctorsArr.data]);
  
        const patientsArr = await axios('http://localhost:666/medical-care-rioiv/patients',);
        setPatients(...patients, ...[patientsArr.data]);
      }
      const defaultDoctor = ()=>{
        setSelectedDoctor("No Se Selecciono Doctor");
      }
        defaultDoctor();

        getData();
    }, []);

    

        return(
        <div>
            <div className="inner-container">
    
            <div className="wrapper-left">
                <div className="doctor-list">
                    <DoctorList onChange={changeDoctor} doctorsp={ doctors }/>
                </div>
                <div className="patient-list">

                    <PatientList patientsp={ patients } />
                    
                </div>
            </div>

            <div className="wrapper-right">
                <div className="profile-header">
                    <div className="selected-doctor">{ 
                          selectedDoctor
                         }
                    </div>
                     
                </div>
                <div className='schedule'>
                        <Calendar/>
                </div>
            </div>

            </div>
        </div>
        )
    }
export default App