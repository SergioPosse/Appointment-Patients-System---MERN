import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './DoctorList.css'
import SearchIcon from './search.svg';

export default class DoctorList extends Component {


    render(){

      const handlePatientsClick = () => {
        ReactDOM.render(
          <SearchIcon/>, document.getElementById('patients')
          );
      }

      const handleDoctorsClick = () => {
        ReactDOM.render(
          "Doctor list", document.getElementById('patients')
          );
      }

        return(
            <div className="grid">

                <div id="menu">
                  <button onClick={handlePatientsClick}>Patients</button>
                  <button onClick={handleDoctorsClick}>Doctors</button>
                </div>

                <div id="patients">

                </div>
               
            </div>
        )
    }
}