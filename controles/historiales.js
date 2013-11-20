exports.historial = function  (req, res) {
	if(typeof(req.session.paentro)!=="undefined"){
		res.render('../vistas/historial');
	}else{
		res.redirect('/');
	}
}