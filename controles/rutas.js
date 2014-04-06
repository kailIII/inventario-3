var index 	= require("./index");
var comprar = require("./comprar");
var abminis	= require("./abministrador");
var activar = require("./activar");
var usuario = require("./usuario");
var bodegas = require("./bodegas");
var histori = require("./historiales");
var total   = require("./total");

/*-------------muy sexi barra separadora---------------*/

exports.rutas = function (app) {
	
	app.get('/comprar',comprar.imprimaComprar);
	app.post('/comprar',comprar.comprar);	
	app.get('/activa/:id',activar.activar);

	app.get('/',index.index);
	app.post('/',index.indexRespuesta);
	app.get('/abministrador',abminis.abministrador);

	app.get('/usuarios',usuario.usuario);
	app.get('/usuarios/liste',usuario.liste);
	app.get('/usuarios/:nombre',usuario.consiga);
	app.post('/usuarios/ingrese',usuario.ingrese);
	app.post('/usuarios/actualice',usuario.actualice);
	app.post('/usuarios/elimine',usuario.elimine);
	app.get('empleado/:id',activar.activeEmpleado);

	app.get("/bodegas",bodegas.bodegas);
	app.get("/bodegas/ingrese",bodegas.ingrese);	
	app.get("/historiales",function(req, res){
		res.send("hola puto mundo");
	});
	app.get("/total",function(req, res){
		res.send("hola puto mundo");
	});
}