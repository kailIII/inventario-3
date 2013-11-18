var mongos = require("mongoose");
var Schema = mongos.Schema;

var empleados = new Schema({
	idmayor:String,
	nombre:String,
	correo:String,
	contraseña:String,
	bodega:String,
	activa:Boolean
});

exports.empleados = mongos.model("empleado",empleados);