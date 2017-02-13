var usuarioModel = require('../modelos/usuario');

module.exports.autentificar = (correo, clave, done) => { 
  usuarioModel.findOne({correo}, (err, datosUsuario) => { 
    if(err) return done(err); 

    if(!datosUsuario){
      return done(null, false, { mensaje: 'Nombre o Clave Incorrecta.' });
    }

    if(datosUsuario.comprobarclave(clave)){
      return done(null, false, { mensaje: 'Nombre o Clave Incorrecta.' });
    }
    
    return done(null, datosUsuario);
  });
};

module.exports.verificar = (rango) => {
	return (req, res, next) => {
		if(req.sAuthenticated())
				next();
		else
			res.redirect("/ingresar");
	};
};

module.exports.denegar = (rango) => {
  return (req, res, next) => { 
    if(req.sAuthenticated())
      if(req.user.rango !== rango)  return next();
      
    res.status(401);
    res.json({'mensaje':'permiso denegado'});
  };
};