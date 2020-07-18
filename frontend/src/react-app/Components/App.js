import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Calendar from './Calendar';
import DoctorList from './DoctorList';

export default class App extends Component {
    render(){
        return(
        <div>
            <div className="inner-container">
    

            <div className="wrapper-left">
                <div className="doctor-list">
                    <BrowserRouter>
                        <Route path="/" component={ DoctorList }/>
                    </BrowserRouter>
                </div>
                {/* <div className="patient-list">
                </div>
                <div className="health-insurance-box">
                </div> */}
            </div>  


            <div className="wrapper-right">
                <div className="profile-header">
                    <section>profile-header</section>
                </div>
                <div className='schedule'>
                    <BrowserRouter>
                        <Route path="/" component={ Calendar }/>
                    </BrowserRouter>
                    
                </div>
            </div>

            </div>
            
        </div>          
        )
    }
}