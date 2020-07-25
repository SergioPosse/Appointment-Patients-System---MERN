import React from 'react';

const PatientList = ({ patientsp }) =>{

  const printRow = ()=>{
    //this return only works this way of write, pass 2 days figuring out whats the problem 
    //cause wasnt render the item.name item.speciality in the element td, was empty before i fixed it
    return patientsp.map( (item)=><tr key={ item.name }><td key={ item.name }>{item.name}</td><td key={ item.dni }>{ item.dni }</td></tr> )
  }

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
          { printRow() }
        </tbody>
      </table>
      </div>
    </div>
  )
}
export default PatientList