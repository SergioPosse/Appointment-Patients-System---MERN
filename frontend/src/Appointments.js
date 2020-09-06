import React from 'react';
import './Appointments.scss';
import moment from 'moment-timezone';

const Appointments = (props) =>{
  const { appointments, handleTurnClick } = props;

  const arrAppointments = appointments.map( (item)=>(

    <tr key={ item._id }>
      <td key={ item._id+item.patient.name }>{item.patient.name}</td>
      <td key={ item._id+item.doctor.name }>{item.doctor.name}</td>
      <td key={ item._id+item.description }>{item.description}</td>
      <td key={ item._id+item.acomplishDate }>{moment(item.acomplishDate.slice(0,10)).format("DD-MM-YYYY")}</td>
      <td key={ item._id+item.agreedDate }>{moment(item.agreedDate).format("DD-MM-YYYY")}</td>
      <td key={ item._id+item.time }>{item.time}</td>
      <td key={ item._id+item.state }>{ item.state? "Concluido" : "Pendiente" }</td>
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
              Hora
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