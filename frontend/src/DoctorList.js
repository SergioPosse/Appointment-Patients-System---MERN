import React,{ useState, useEffect, useRef} from 'react';
import './DoctorList.scss';

const DoctorList = (props) =>{
  const { selectedDoctor, doctorsp, changeDoctor } = props;
  const arrDoctors = doctorsp.map( 

    (item)=>{
      let clase ="";
      selectedDoctor==item._id ? clase="marked-patient" : clase="";
      return <tr className={ clase } onClick={ ()=>props.changeDoctor(item) } key={ item.name }><td key={ item.name }>{item.name}</td><td key={ item.speciality }>{ item.speciality }</td></tr> 
    }
    );
      

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
