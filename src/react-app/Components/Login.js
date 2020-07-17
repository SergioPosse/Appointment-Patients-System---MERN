import React, { Component } from 'react';

export default class Login extends Component {
    render(){
        return(
    <div>
        <div className="container">
        <div className="mandala"></div>
                <div className="login-box">
                    <div className="login-form">
                        <form>
                            <h1>Tardes Dulces</h1>
                            <input placeholder="type email" type="text"/>
                            <input placeholder="type password" type="password"/>
                            <button type="submit"><div className="spinner">Login</div></button>
                        </form>
                    </div>
                </div>  
        </div>
    </div>
        ) 
    };
}