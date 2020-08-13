import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.scss';
import moment from 'moment';

import DoctorList from './DoctorList'
import PatientList from './PatientList'
import Calendar from './Calendar'
import Appointments from './Appointments'

import ReactCardFlip from 'react-card-flip';


function App() {
  console.log("render app");

  const [isFlipped,setIsFlipped]=useState(false);

  const dateRef = useRef();
  const patientRef = useRef();
  const doctorRef = useRef();

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [doctors, setDoctors] = useState([]);
  
  const [selectedDate, setSelectedDate] = useState(moment().format("DD-MM-yyyy"))
  const [selectedDoctor, setSelectedDoctor] = useState("Doctor: Ninguno!");
  const [selectedPatient, setSelectedPatient] = useState("Paciente: Ninguno!")

  const changeDoctor = async(data) => {
    console.log("render changeDoctor fn in app")
    setSelectedDoctor(data.name + "-"+ data.speciality);

        let oldClass = doctorRef.current.className;
        doctorRef.current.className = doctorRef.current.className.concat(" pop-up2");
        await setTimeout(()=>{doctorRef.current.className = oldClass+" success"},500);
  }

  const changePatient = async(data) => {
    console.log("render changePatient fn in app")
    setSelectedPatient(data.name + "-"+ data.dni);
    let oldClass = patientRef.current.className;
        patientRef.current.className = patientRef.current.className.concat(" pop-up2");
        await setTimeout(()=>{patientRef.current.className = oldClass+" success"},500);
  }

    useEffect(()=>{
      console.log("render useEffect for doctors fetch in app")
          axios
            .get('http://localhost:666/medical-care-rioiv/doctors')
            .then(res=>{
                console.log(res.data)
              setDoctors(res.data)
            })
    },[])

    useEffect(()=>{
      console.log("render useeffect for patients fetch in app")
          axios
          .get('http://localhost:666/medical-care-rioiv/patients')
          .then(res=>{
            setPatients(res.data)//al actualizar con patients state usememo en patientlist component renderiza sino no
            //porque use useMemo con dependencia de patientsp
          })
    },[])

    useEffect(()=>{
      console.log("render useffect in app appointments")

          axios
          .get('http://localhost:666/medical-care-rioiv/appointments')
          .then(res=>{
            setAppointments(res.data)
          })
    },[])

    const getDayClicked = async (date)=>{
        console.log("getDayClicked  ")
        setSelectedDate(date);
        let oldClass = dateRef.current.className;
        dateRef.current.className = dateRef.current.className.concat(" pop-up2");
        await setTimeout(()=>{dateRef.current.className = oldClass+" success"},500);
        
    }

    const handleTurnClick = ()=>{
      setIsFlipped(!isFlipped);
    }


        return(
        <>
            <div className="inner-container">
    
            <div className="wrapper-left">
                <div className="doctor-list">
                    <DoctorList changeDoctor={ changeDoctor } doctorsp={ doctors }/>
                </div>
                <div className="patient-list">

                    <PatientList changePatient={ changePatient } patientsp={ patients } />
                    
                </div>
            </div>

            <div className="wrapper-right">
                <div className="profile-header">
                    <div ref={ patientRef } className="selected-patient">{ 
                          selectedPatient
                         }
                    </div>
                    <div ref={ dateRef } className="selected-date">{ 
                          selectedDate
                         }
                    </div>
                     
                </div>
                <div className='schedule'>
                  
                    <ReactCardFlip isFlipped={ isFlipped } flipDirection="vertical">
                      <Calendar handleTurnClick={ handleTurnClick } doctorRef={ doctorRef } description={ selectedDoctor } getDayClicked={ getDayClicked } >
                      </Calendar>
                      <Appointments handleTurnClick={ handleTurnClick } appointments={ appointments }>
                      </Appointments>
                    </ReactCardFlip>
                </div>
            </div>
            

            </div>

        </>
        )
    }
export default App