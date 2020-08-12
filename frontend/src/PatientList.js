import React from 'react';

const PatientList = (props)=>{
    const { patientsp, changePatient} = props
    console.log("render patientlist")
    const printRow =  patientsp.map( (item)=><tr onClick={ ()=>props.changePatient(item)} key={ item.name }><td key={ item.name }>{item.name}</td><td key={ item.dni }>{ item.dni }</td></tr> )
   
  return(
    <div className="container">
    <div className="content">
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
  )
}
export default PatientList