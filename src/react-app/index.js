import React from 'react';
import ReactDOM from 'react-dom'; ///tuve que importar reactdom para usar render sino no me dejaba
import App from './Components/App';
import Login from './Components/Login';

let logged = true;

if(!logged){
      ReactDOM.render(
      <Login/>, document.getElementById('app')
      );
}else{
    ReactDOM.render(
      <App/>,
      document.getElementById('app')
    )
}


