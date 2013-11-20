var index 	= require("./index");
var comprar = require("./comprar");
var abminis	= require("./abministrador");
var activar = require("./activar");
var usuario = require("./usuario");
var bodegas = require("./bodegas");
var histori = require("./historiales");
var total   = require("./total");
var cambio  = require("./cambio");

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
	app.get('/empleado/:id',activar.activeEmpleado);

	app.get("/bodegas",bodegas.bodegas);
	app.post("/bodegas/ingrese",bodegas.ingrese);	

	app.get("/historiales",histori.historial);
	
	app.get("/total",total.total);

	app.post('/cambio/empleado',cambio.contraseñaEmpleado);
}