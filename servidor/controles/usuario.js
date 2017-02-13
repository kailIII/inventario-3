const usuarioModel = require('../modelos/usuario');
const cadena       = require('../constantes/cadena');



module.exports.crear = (req, res, next) => {
	const usuarioDatos = req.body;
	const rango = 'rango';

	if(rango in usuarioDatos){
		if(usuarioDatos[rango] == cadena.GENERAL){
			res.status('400');
			res.json({
				mensaje: 'usted no puede crear un usuario con este rango'
			});
			return;
		}
	}

	new usuarioModel(usuarioDatos).save((err, usuario) => {
		if(err)	next(err);	
		
		res.status('201');
		res.json({
			estatus: true,
			mensaje: 'a creado un nuevo usuario correctamente',
			usuario: usuario.darFormato()
		});
	});
};


/*-------------muy sexi barra separadora---------------*/


module.exports.registro = (req, res, next) => {
	const usuarioDatos = req.body;
	const rango = 'rango';

	if(rango in usuarioDatos){
		if(usuarioDatos[rango] !== cadena.NORMAL){
			usuarioDatos[rango] = cadena.NORMAL;
		}
	}

	new usuarioModel(usuarioDatos).save((err, usuario) => {
		if(err)	next(err);	

		res
		.status('201')
		.json({
			estatus: true,
			mensaje: 'se ha registrado de forma exitosa',
			usuario: usuario.darFormato()
		});
	});
};


/*-------------muy sexi barra separadora---------------*/


module.exports.ingresar = (req, res) => {
	res
	.status(200)
	.json({
		estatus : true,
		mensaje : 'Ha creado ingresado al administrador',
		usuario : req.user.darFormato()
	});
};

/*-------------muy sexi barra separadora---------------*/


module.exports.consegir = (req, res, next) => {
	
	let query = {};

	let { usuarioId } = req.params;

	if(usuarioId){
		query._id = usuarioId;
	}

	if(req.query){
		for(let p in req.query){
			if(req.query[p]){
				query[p] = req.query[p];
			}
		}
	}

	usuarioModel().find(query, (err, usuarios) => {
		if(err)	next(err);	

		res
		.status('201')
		.json({
			estatus: true,
			mensaje: 'se ha registrado de forma exitosa',
			usuario: usuarios.map(u => u.darFormato())
		});
	});
};