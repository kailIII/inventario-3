var mongos = require("mongoose");
var Schema = mongos.Schema;

var correo = new Schema({
	nombre:String,
	correo:String,
	contraseña:String,
	activada:Boolean
});

exports.correo = mongos.model("usuario",correo);