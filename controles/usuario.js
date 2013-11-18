var correo = require("./smtp");
var madb   = require("../modelos/abministradoresDeBodega");

/*-------------muy sexi barra separadora---------------*/

exports.usuario = function(req, res) {
	if(typeof(req.session.paentro)!=='undefined'){
		res.render('../vistas/usuarios');
	}else{
		res.redirect('/');
	}
}

/*-------------muy sexi barra separadora---------------*/

exports.consiga = function(req, res, next){
	//patente pendiente
	var validarcorreo = /(.+)@(.+){2,}\.(.+){2,}/;
	var validarusuario = /^[\w]+$/i;
	var cosa = req.params.nombre;
	if(validarcorreo.test(cosa)){
		madb.empleados.find({correo:cosa},retorne);
	}else if(validarusuario.test(cosa)){
		madb.empleados.find({nombre:cosa},retorne);
	}
	function retorne (err, respuesta) {
		if (err) {
			return next(err);
		}
		if(respuesta==null){
console.log("he aqui tu respuesta:"+respuesta+"\n");}
		var datosamostrar = {};
		datosamostrar.nombre = respuesta[0].nombre;
		datosamostrar.correo = respuesta[0].correo;
		datosamostrar.bodega = respuesta[0].bodega;
		datosamostrar.activa = respuesta[0].activa;
		res.send(datosamostrar);
				
	}	
}

/*-------------muy sexi barra separadora---------------*/

exports.actualice = function(req, res){
	//correo.enviar(titulo, mensage, correoElectronico);

}

/*-------------muy sexi barra separadora---------------*/

exports.ingrese = function(req, res, next){
	var id = req.session.paentro.id;
	var nombre = req.body.nombre;
	var correoElectronico = req.body.correo;
	var bodega = req.body.bodega;

	var InfoNuevoEmpleado = {
		idmayor:id,
		nombre:nombre,
		correo:correoElectronico,
		contraseña:"",
		bodega:bodega,
		activa:false
	};

	var nuevoEmpleado = new madb.empleados(InfoNuevoEmpleado);
	nuevoEmpleado.save(soyanonima);		
	
	function soyanonima(err, resultado){
		if(err){
			res.send('Ha ocurrido un error porfavor intentalo mas tarde');
		}else{
			console.log('se ha ingresado como: \n'+resultado);
			var titulo = 'Hola nuevo abministrador';
			var mensage = 'hola se te ha creado una cuenta en el <b>manejador de inventario</b> '+
						  'porfavor dirigete al enlase abjunto para cambiar la contraseña '+
						  '<a href="localhost:3000/empleado/'+ resultado.id +'"> aqui </a>' ;
			correo.enviar(titulo, mensage, correoElectronico);
			console.log('equipo azul');


		}
	}
}

/*-------------muy sexi barra separadora---------------*/

exports.elimine = function(req, res){
	var nombre = req.body.nombre;
	var correo = req.body.correo;
	var InfoNuevoEmpleado = {
		nombre:nombre,
		correo:correo
	};
	madb.empleados.find(InfoNuevoEmpleado,function  (err, respuesta) {
		if(err){ res.send('hay algo pasa 1'); }
		console.log(respuesta);
		if(respuesta!=='[]'){
		madb.empleados.remove(respuesta,function (err) {
			if(err){ res.send('hay algo pasa aaaaaaañañaña'); }
			else{ res.send("se ha eliminado"); }
		});
		}
	});
}

/*-------------muy sexi barra separadora---------------*/

exports.liste = function(req, res){
	madb.empleados.find({},function (err, respuesta) {
		if (err) { return next(err); }
		else{ 
		var enviar = [];
			for (var i = 0; i < respuesta.length; i++) {
				var datos  = {};
				datos.nombre = respuesta[i].nombre;
				datos.correo = respuesta[i].correo;
				datos.bodega = respuesta[i].bodega;
				datos.activa = respuesta[i].activa;
				enviar.push(datos);
		console.log("------soy un puto salto de linea------");
			}
			res.json(enviar.slice());
		} 
	});
}