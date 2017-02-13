const usuarioModelo = require('../modelos/usuario');
const constantes 	= require('../constantes/cadenas');

/*-------------muy sexi barra separadora---------------*/

const imprimir = (req, res) => {
	res.reder();
};

/*-------------muy sexi barra separadora---------------*/

const crear = (req, res) => {
	let { usuario } = req.body;

	usuario.rango = cadenas.ADMINISTRADOR;
	
	new usuarioModelo(usuario).save((err, admin) => {
		if(err) next(err);

		res.status(201);
		res.json(admin.darFormato());
	});
};

/*-------------muy sexi barra separadora---------------*/


const listar = (req, res) => {

	let query = {
		'$or':[
			{'rango': cadenas.ADMINISTRADOR},
			{'rango': cadenas.BODEGA}
			]
	};

	usuarioModelo.find(query, (err, admins) => {
		if(err) next(err);

		res.status(201);
		res.json(admins.map(a => a.darFormato()));
	});
};

/*-------------muy sexi barra separadora---------------*/


const actualizar = (req, res) => {
	
};

/*-------------muy sexi barra separadora---------------*/


const eliminar = (req, res) => {
	
};

/*-------------muy sexi barra separadora---------------*/


module.exports.abministrador =  {
	crear
};