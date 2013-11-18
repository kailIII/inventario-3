var mongoose = require("mongoose");
var rutadb	 = "mongodb://localhost/inventario";
var conexion;

/*-------------muy sexi barra separadora---------------*/

exports.abriConexion = function() {
	conexion = mongoose.connect(rutadb);
};

// exports.cerrarConexion = function() {
// 	conexion = mongoose.connect(rutadb);
// };