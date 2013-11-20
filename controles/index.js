var bcrypt = require("bcryptjs");
var modeloUsuario = require("../modelos/usuario.js");

/*-------------muy sexi barra separadora---------------*/

exports.index = function(req,res){
		res.render('../vistas/index');
}

/*-------------muy sexi barra separadora---------------*/

exports.indexRespuesta = function(req, res, next){
		var usuario 	= req.body.usuario;
		var contraseña	= req.body.contraseña;
		var validarusuario = /^[\w]+$/i;

		if (usuario !== "" && validarusuario.test(usuario)) {
		modeloUsuario.correo.find({'nombre':usuario},function(err, resultado) {
			if(err){
				return next(err);
			}else{
				if(resultado.length!==0){
					bcrypt.compare(contraseña, resultado[0].contraseña, function (err, pasa) {
						if(err){
							console.log('es falsa'+err);
							res.redirect('/');
						}else{
							if(pasa){
								if(!resultado[0].activada){
									console.log('es falsas');
									res.send('porfavor activa antes tu cuenta');
								}else{
									req.session.paentro = {id:resultado[0].id,usuario:resultado[0].nombre};
									res.redirect('/abministrador');
									console.log('login desde '+req.connection.remoteAddress);
								}
							}else{
								res.send('<script>alert("contraseña invalida");</script>');
							}
						}
					});
				}else{
					res.redirect("/");
				}
			} 
		});
		}else{
			res.send("malditos piratas!!");
		}
}
