const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const producto = new Schema({
	nombre: String,
	imagen: String,
	marca : String,
	presio: Number,
	caracteristicas: String,
	subproducto : [{ 
		type:Schema.Types.ObjectId, 
		ref: 'Producto'
	}]
}, {  timestamps: true  });

module.exports.productos = mongos.model("Producto", producto);