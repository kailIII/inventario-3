//nombre
//precio
//cantidad

var mongos = require("mongoose");
var Schema = mongos.Schema;

var productos = new Schema({
	nombre:String,
	cantidad:String,
	precio:String,	
	bodega:String
});

exports.productos = mongos.model("producto",productos);