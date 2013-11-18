var productos = require("../modelos/productos");
var bodega    = require("../modelos/bodega");

/*-------------muy sexi barra separadora---------------*/

exports.bodegas = function (req, res) {
	if(typeof(req.session.paentro)!=='undefined'){
		res.render("../vistas/bodegas");
	}else{
		res.redirect("/");
	}
}

/*-------------muy sexi barra separadora---------------*/

exports.listar = function (req, res){

	//productos.productos.find();
	//
}

/*-------------muy sexi barra separadora---------------*/

exports.ingrese = function (req, res){
	console.log('equipo azul');
	var InfoBodega = {
				idmayor:"resultado.id",
				bodega:"5"
			};

			var nuevaBodega = new bodega.bodegas(InfoBodega);
			console.log(InfoBodega);
			nuevaBodega.pre("save",function(err){
				if (err) { console.log("hay jueputa echele agua"); }
				else{
				res.send("Guardado");	
				}
			});
}

/*-------------muy sexi barra separadora---------------*/

exports.eliminar = function (req, res){
	//productos.productos.remove();
	//elimine los productos clas que si estan vacios
}