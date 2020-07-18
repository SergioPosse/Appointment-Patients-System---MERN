const app = require('./app');

let port = app.get('port');

//starting the server
async function init(){
    await app.listen(port,()=>{
        console.log(`React cargado en server node en el puerto ${port}`);
    });
    
}

init();