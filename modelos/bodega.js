var mongos = require("mongoose");
var Schema = mongos.Schema;

var bodegas = new Schema({
	idmayor:String,	
	bodegas:String
});

exports.bodegas = mongos.model("bodega",bodegas);