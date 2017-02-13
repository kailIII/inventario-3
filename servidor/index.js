const http     = require("http");
const express  = require("express");
const app      = express();
const port     = process.env.PORT || 3000;
const conexion = require('./configuracion/conexion');

require('./configuracion/configuracionServidor')(app);

let servidor = http.createServer(app);

if(require.main !== module){
	module.exports = servidor;
}else{
    if (!mongoose.connection.db){ 
    	conexion(process.env.NODE_ENV, () => {
				servidor.listen(process.env.port || port);
	    			
				servidor.on('listening', () => {
					console.log('\n\tcorriendo servidor\n');
				});
    	});
    }
	
}

