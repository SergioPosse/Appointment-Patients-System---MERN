import React,{ useState, useEffect, useRef} from 'react';
import './DoctorList.scss';

const DoctorList = (props) =>{
  console.log("render doctorlist");
  const { doctorsp, changeDoctor } = props;
  const arrDoctors = doctorsp.map( (item)=><tr onClick={ ()=>props.changeDoctor(item) } key={ item.name }><td key={ item.name }>{item.name}</td><td key={ item.speciality }>{ item.speciality }</td></tr> );
      

  return(
    <div className="container">
      <div className="content">
      <table className="table centered highlight">
          <thead>
          <tr>
            <th>
              Médico
            </th>
            <th>
              Especialidad
            </th>
            </tr>
          </thead>
        <tbody>
          { arrDoctors }
        </tbody>
      </table>
      </div>
    </div>
  )
}
export default DoctorList
