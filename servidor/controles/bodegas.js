let BodegaModelo    = require("../modelos/bodega");

/*-------------muy sexi barra separadora---------------*/

module.exports.bodegas = function (req, res) {
	res.render("../vistas/bodegas");	
};

/*-------------muy sexi barra separadora---------------*/

module.exports.listar = (req, res) => {
	BbodegaModelo.find((err, bodegas) => {
		if(err) next(err);
		res.json(bodegas.map(b => { b.darFormato(); })); 
	});
};

/*-------------muy sexi barra separadora---------------*/

module.exports.porId = (req, res) => {
	let { idBodega } = req.param;
	BbodegaModelo.findOne({ _id:idBodega }, (err, bodegas) => {
		if(err) next(err);
		res.json(bodegas.map(b => { b.darFormato(); })); 
	})
	.populate('inventario.producto');
};


/*-------------muy sexi barra separadora---------------*/

module.exports.ingrese =  (req, res) => {
	let InfoBodega = req.body;
	var nuevaBodega = new BbodegaModelo(InfoBodega);
			
};

/*-------------muy sexi barra separadora---------------*/

module.exports.eliminar = function (req, res){
	let { idBodega } = req.param;
	BbodegaModelo.remove({_id: idBodega }, (err, status) => {
		res.json();
	});
};