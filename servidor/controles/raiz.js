const UsuarioModel = require('../modelos/usuario');
const cadena     = require('../constantes/cadena');

/* index */
module.exports.raiz = (req, res) => {
	res.render('../../cliente/vistas/index'); 
};

/* guarda el usario administrador */
module.exports.configuracion = (req, res) => {
	res.render('../../cliente/vistas/configuracion'); 
};


module.exports.ingresarAdmin = (req, res, next) => {
	const body = req.body;
	body.rango = cadena.GENERAL;
	
	new UsuarioModel(body).save((err, administrador) => {
		if(err) next(err);

		let respuesta = {
			estatus : true,
			mensaje : 'Ha creado ingresado al administrador',
			usuario : administrador.darFormato()
		};
		
		res
		.status(201)
		.json(respuesta);
	});

};

