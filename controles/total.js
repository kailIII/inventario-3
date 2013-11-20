exports.total = function  (req, res) {
	if(typeof(req.session.paentro)!=="undefined"){
		res.render('../vistas/total');
	}else{
		res.redirect('/');
	}
}