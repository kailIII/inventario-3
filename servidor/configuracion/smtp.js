'use strict';

var nodemailer = require("nodemailer");

class EnvioCorreos{

	constructor(OpcDeConfiguracion){
		this.protocoloSmtp = OpcDeConfiguracion ?  nodemailer.createTransport('SMTP',OpcDeConfiguracion) : {};
	}

	set opciones(opciones){
	 	
	  this.OpcDeEnvio = {
			from   : opciones.cRemitente,
			to     : opciones.cDestinatario, 
			subject: opciones.titulo, 
			html   : opciones.mensage
		};
	}

	get opciones(){
		return this.OpcDeEnvio;
	}

	envio(cb){
		this.protocoloSmtp.sendMail(this.OpcDeEnvio, function(err, response){
			cb(err, response);    
		});	
	}
}

module.export = EnvioCorreos;