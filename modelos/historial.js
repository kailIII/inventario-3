var mongos = require("mongoose");
var Schema = mongos.Schema;

var historial = new Schema({
	idmayor:String,
	accion:String,
	cantidad:String,
	bodega:String
});

exports.historial = mongos.model("historial",historial);