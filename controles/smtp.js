var nodemailer = require("nodemailer");

exports.enviar = function (titulo, mensage, correoElectronico) {

		var OpcDeConfiguracion ={
	    service: 'Gmail',
			auth: {
		  		user: '********',
		  		pass: '********'
			}
	  	};
	  	var OpcDeEnvio = {
		    from: 'brian bustos <larous025@gmail.com>',
			to: correoElectronico, 
			subject: titulo, 
			html: String(mensage)
		}
		var protocoloSmtp = nodemailer.createTransport('SMTP',OpcDeConfiguracion);
		
		protocoloSmtp.sendMail(OpcDeEnvio, function(err, response){
			    if(err){
				  console.log ('No envio');
				}else{
				  console.log('Fue enviado');
				}
			});	
}