var ModeloUsuarioCorreo = require("../modelos/usuario").correo;
var madb   = require("../modelos/abministradoresDeBodega");

/*-------------muy sexi barra separadora---------------*/

exports.activar = function  (req, res, next) {
	var id = req.params.id;
	ModeloUsuarioCorreo.findByIdAndUpdate(id, { $set: { activada: 'true' }}, function (err, resultado) {
	  if (err) return next(err);
	  res.send("su cuenta a sido activada");
	});
};

/*-------------muy sexi barra separadora---------------*/

exports.activeEmpleado = function(req, res){
	var id = req.params.id;
	madb.empleados.findByIdAndUpdate(id, { $set: { activa: 'true' }}, function (err, resultado) {
	  if (err) return next(err);
	  console.log(resultado.contraseña);
	  if(resultado['contraseña']===""){
	  	req.session.cambio = { cambio:'sip',id:resultado.id };
	  	res.render("../vistas/cambiodecontraseña");
	  }else{
	  	res.send("livin in america americaa americaa");
	  }
	});
};