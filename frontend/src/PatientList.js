import React, { useState, useEffect } from 'react';

const PatientList = (props)=>{
  const { selectedPatient, patientsp, changePatient} = props
  const [searchedPatient, setSearchedPatient ] = useState("");

  const printRow =  patientsp
    .filter((patient)=>{
        let search = searchedPatient;
        let reg = new RegExp("^"+search,"g");
        // console.log("escribiendo: "+reg);
        // console.log("comparado a: "+patient.dni);
        if (reg.test(patient.dni)){
          return patient
        }
    })
    .map( (item)=>{
    let clase ="";
    selectedPatient==item._id ? clase="marked-patient" : clase="";
    return <tr className={ clase } onClick={ ()=>props.changePatient(item)} key={ item.name }><td key={ item.name }>{item.name}</td><td key={ item.dni }>{ item.dni }</td></tr> 
    }
    );
 
  useEffect(()=>{

  },[searchedPatient])

  return(
    <div className="container">
    <div className="patient-content">

        <div className="searcher">
          <input 
            type="text" 
            placeholder="busca por DNI" 
            value={ searchedPatient } 
            onChange={ (event)=>{setSearchedPatient(event.target.value.trim())}}
          />
        </div>

        <div className="tabla">
          <table className="table centered highlight">
              <thead>
              <tr>
                <th>
                  Nombre
                </th>
                <th>
                  DNI
                </th>
                </tr>
              </thead>
            <tbody>
              { printRow }
            </tbody>
          </table>
        </div>
      
      </div>
    </div>
  )
}
export default PatientList