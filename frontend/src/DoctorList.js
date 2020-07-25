import React,{ useState, useEffect} from 'react';
import './DoctorList.css';

const DoctorList = (props) =>{
  const { doctorsp } = props;

  const [doctor, setDoctor] = useState([]);

  const selectDoctor = (doctor,speciality)=>{
    setDoctor( doctor+" - "+speciality );
  }

  useEffect(() => {
    if (props.onChange) {
      props.onChange(doctor)
    }
  }, [doctor])

  const printRow = ()=>{
    //this return only works this way of write, pass 2 days figuring out whats the problem 
    //cause wasnt render the item.name item.speciality in the element td, was empty before i fixed it
    return doctorsp.map( (item)=><tr onClick={ ()=>selectDoctor(item.name,item.speciality) } key={ item.name }><td key={ item.name }>{item.name}</td><td key={ item.speciality }>{ item.speciality }</td></tr> )
  }

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
          { printRow() }
        </tbody>
      </table>
      </div>
    </div>
  )
}
export default DoctorList
