const mongoose = require("mongoose");
const Schema   = mongos.Schema;

var bodegas = new Schema({
	empresa:String,	
	direcion:{
		fisica:String,
		ciudad:String,
		codigopostal:String
	},
	inventario:[{
			cantidad:Number,
			producto:{
				type:Schema.Types.ObjectId,
				ref: 'Producto'
			}
		}]
});

module.exports.bodegas = mongos.model("Bodega",bodegas);