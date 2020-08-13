import React,{ useState, useEffect, useRef} from 'react';
import './Appointments.scss';

const Appointments = (props) =>{
  console.log("render appointments");
  const { appointments, handleTurnClick } = props;
  const arrAppointments = appointments.map( (item)=><tr key={ item._id }><td key={ item._id }>{item.patient}</td><td key={ item.doctor }>{item.doctor}</td></tr> );
      

  return(
    <div className="appointments-container">
      <div className="content-appointments">
      <table className="table centered highlight">
          <thead>
          <tr>
            <th>
              Paciente
            </th>
            <th>
              Medico
            </th>
            </tr>
          </thead>
        <tbody>
          { arrAppointments }
        </tbody>
      </table>
      </div>
      <button onClick={ handleTurnClick }>Volver</button>

    </div>
  )
}
export default Appointments