"use strict";

let bcrypt = require('bcryptjs');
let correo = require('../configuracion/smtp');
let ModeloUsuarioCorreo = require('../modelos/usuario');

/*-------------muy sexi barra separadora---------------*/

exports.imprimaComprar =  (req, res) => {
	res.render('../../cliente/vistas/comprar');
};

/*-------------muy sexi barra separadora---------------*/

exports.comprar = (req, res, next) => {

	let validarcorreo = /(.+)@(.+){2,}\.(.+){2,}/;
	let validarusuario = /^[\w]+$/i;
	let nombreusuario = req.body.nombre;
	let correoElectronico = req.body.correo;
	let contraseña = req.body.contraseña;
	
	if(validarcorreo.test(correoElectronico) && validarusuario.test(nombreusuario)){

		bcrypt.genSalt(10, function (err, salt) {
                if(err){
                      return next(err);
                }else{
                	bcrypt.hash(contraseña, salt, function (err, hash) {
                                if(!err){
                                        let NuevoUsuario = {nombre:nombreusuario,correo:correoElectronico,contraseña:hash,activada:false};
                                        let MUC = new ModeloUsuarioCorreo.correo(NuevoUsuario); 
										MUC.save(tengoNombre);

                                }else{
                                        req.session.alert = { message: 'Error de registro de Usuario', status: 'danger' };
                                }
                    });
                }
        });

	}else{
		res.send("informaciin no valida");
	}

	function tengoNombre (err,resutaldo) {
		if(err){
			console.log(`En este punto se jodio: ${err} \n`);
			return next(err);
		}else{
			let titulo  = 'Suscripcion a inventarios';
			let mensage = '<table> <thead> <h2>Estas abordo</h2> </thead> <tbody> <tr>'
			+'<p> gracias por suscribirte la <b>manejador de inventarios</b>, para completar la suscripcion favor dirjase al siguiente enlace</p>'+
			 '</tr> <tr> <a href="http://localhost:3000/activa/'+resutaldo.id+'">aqui</a> </tr> </tbody> </table>';
			correo.enviar(titulo, mensage, correoElectronico);
			res.send("Se ha enviado un correo electronico favor  berifique su correo");
			
		}
	}

};