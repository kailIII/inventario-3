exports.abministrador = function(req,res){
	if(typeof(req.session.paentro)!=="undefined"){
		res.render("../vistas/abministrador");
	}else{
		res.redirect("/");
	}
}