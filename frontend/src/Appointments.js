import React,{ useState, useEffect, useRef} from 'react';
import './Appointments.scss';
import moment from 'moment';

const Appointments = (props) =>{
  console.log("render appointments");
  const { appointments, handleTurnClick } = props;

  
  const arrAppointments = appointments.map( (item)=>(

    <tr key={ item._id }>
      <td key={ item._id }>{item.patient.name}</td>
      <td key={ item.doctor }>{item.doctor.name}</td>
      <td key={ item.doctor }>{item.description}</td>
      <td key={ item.doctor }>{moment(item.acomplishDate).format("DD-MM-YYYY")}</td>
      <td key={ item.state }>{moment(item.agreedDate).format("DD-MM-YYYY")}</td>
      <td key={ item._id+item.state}>{ item.state? "Concluido" : "Pendiente" }</td>
    </tr>)
  )

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
            <th>
              Descripcion
            </th>
            <th>
              Limite
            </th>
            <th>
              Solicitado
            </th>
            <th>
              Estado
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