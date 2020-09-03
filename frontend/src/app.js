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
  const [isDisabled, setIsDisabled]=useState(true);

  const dateRef = useRef();
  const patientRef = useRef();
  const doctorRef = useRef();

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [doctors, setDoctors] = useState([]);
  
  const [selectedDate, setSelectedDate] = useState({ id: null, text: moment().format("DD-MM-yyyy"), state: false } )
  const [selectedDoctor, setSelectedDoctor] = useState({ id: null, text:"Doctor: Ninguno!", state: false } );
  const [selectedPatient, setSelectedPatient] = useState({text:"Ninguno!", state: false})

  const changeDoctor = async(data) => {
    setSelectedDoctor({ id: data._id, text: data.name + "-"+ data.speciality, state: true });

        let oldClass = doctorRef.current.className;
        doctorRef.current.className = doctorRef.current.className.concat(" pop-up");
        await setTimeout(()=>{doctorRef.current.className = oldClass+" success"},500);
  }

  const changePatient = async(data) => {
    setSelectedPatient({ id: data._id, dni: data.dni, text: data.name + "-"+ data.dni, state:true });
    let oldClass = patientRef.current.className;
        patientRef.current.className = patientRef.current.className.concat(" pop-up");
        await setTimeout(()=>{patientRef.current.className = oldClass+" success"},500);
  }

    useEffect(()=>{
          axios
            .get('http://localhost:666/medical-care-rioiv/doctors')
            .then(res=>{
              setDoctors(doctors => res.data)
            })
    },[])

    

    useEffect(()=>{
          axios
          .get('http://localhost:666/medical-care-rioiv/patients')
          .then(res=>{
            setPatients(patients => res.data);//al actualizar con patients state usememo en patientlist component renderiza sino no
            //porque use useMemo con dependencia de patientsp
          })
    },[])

    const loadAppointments = ()=>{
      axios
          .get('http://localhost:666/medical-care-rioiv/appointments')
          .then(res=>{
            setAppointments(res.data)
          })
    }

    useEffect(()=>{
          loadAppointments();
    },[])

    useEffect(()=>{

      if((selectedPatient.state===true) && (selectedDate.state===true) && (selectedDoctor.state===true)){
        setIsDisabled(false);
        console.log("check");
      }  

    },[selectedDoctor,selectedPatient,selectedDate]);

    

    const getDayClicked = async (date)=>{
        console.log("getDayClicked  ")
        setSelectedDate({ text: date, state: true } );
        let oldClass = dateRef.current.className;
        dateRef.current.className = dateRef.current.className.concat(" pop-up");
        await setTimeout(()=>{dateRef.current.className = oldClass+" success"},500);
        
    }

    const handleTurnClick = ()=>{
      loadAppointments();
      setIsFlipped(!isFlipped);
    }

    const handleDateClick = async ()=>{
        let query = 'http://localhost:666/medical-care-rioiv/appointments/'+selectedDoctor.id
        let arrApp = []
        axios
        .get(query)
        .then(res=>{
            if(res.data.length>0){
              res.data.map((item)=>{
                let date1 = moment(item.acomplishDate).format("DD-MM-YYYY");
                let date2 = moment(selectedDate.text).format("MM-DD-YYYY");
                if(date1===date2){
                    arrApp.push(item);
                }
              });
            }
            setAppointments(arrApp);
        });
        await setIsFlipped(!isFlipped);
    }

    const createAppointment = ()=>{
      console.log("create appointment");
    }

    // const removeDisabled = ()=>{
    //   if((selectedPatient.state===true) && (selectedDate.state===true) && (selectedDoctor.state===true)){
    //     setIsDisabled(false);
    //   }  
    // }

        return(
        <>
        <div className="back-op">

        <div className="inner-container">
            <div className="wrapper-left">
                <div className="doctor-list">
                    <DoctorList selectedDoctor={ selectedDoctor.id } changeDoctor={ changeDoctor } doctorsp={ doctors }/>
                </div>
                <div className="patient-list">
                    <PatientList selectedPatient={ selectedPatient.id } changePatient={ changePatient } patientsp={ patients } />
                </div>
            </div>
            <div className="wrapper-right">
                <div className="profile-header">
                    <div ref={ patientRef } className="selected-patient">{ 
                          selectedPatient.text 
                         }
                    </div>
                    <div ref={ dateRef } className="selected-date">{<> 
                          <span value={ selectedDate.text }>{ selectedDate.text }</span>
                          <button onClick={ handleDateClick }>Ver</button>
                          </>
                         }
                    </div>
                </div>
                <div className='schedule'>
                    <ReactCardFlip isFlipped={ isFlipped } flipDirection="vertical">
                      <Calendar 
                        isDisabled={ isDisabled } 
                        handleTurnClick={ handleTurnClick } 
                        doctorRef={ doctorRef } 
                        selectedDoctor={ selectedDoctor } 
                        getDayClicked={ getDayClicked } 
                        createAppointment={ createAppointment }
                        >
                      </Calendar>
                      <Appointments 
                        handleTurnClick={ handleTurnClick } 
                        appointments={ appointments }>
                      </Appointments>
                    </ReactCardFlip>
                </div>
            </div>
            
        </div>

        </div>
        </>
        )
    }
export default App