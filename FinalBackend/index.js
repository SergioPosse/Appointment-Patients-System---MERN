const app = require('./app');
const { mongoose } = require('./database');

let port = app.get('port');

//starting the server
async function init(){
    await app.listen(port,()=>{
        console.log(`Server iniciado en el puerto ${port}`);
    });
    
}
init();