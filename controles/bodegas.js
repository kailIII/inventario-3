var productos = require("../modelos/productos");

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
			var nombre = req.body.nombre;
			var cantidad = req.body.cantidad;
			var bodega = req.body.bodega;
			var precio = req.body.precio;

			infoproducto = {
				nombre:nombre,
				cantidad:cantidad,
				precio:precio,
				bodega:bodega
			};

			var nuevoProducto = new productos.productos(infoproducto);
			nuevoProducto.save(function(err){
				if (err) { console.log("ha fallado"); 
					return next(err);
				}
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