$(document).ready(function(){
	$('#lienzo').on('click', '#btnnuevo', function (e) {
		e.preventDefault();
		var nombre = $('input[name=nombre]').val();
		var cantidad = $('input[name=cantidad]').val();
		var precio = $('input[name=precio]').val();
		var bodega = $('input[name=bodega]').val();
		var enviar = {};
		enviar.nombre = nombre;
		enviar.cantidad = cantidad;
		enviar.precio = precio;
		enviar.bodega = bodega;
		$.post('/bodegas/ingrese', enviar, function (data) {
			$('#nuevoproducto form').fadeOut(function () {
				$(this).remove().parent().append(data);
				setTimeout(function(){
					$(this).text.remove();
				},5000);	

			});
		});
	});
	//----------------------------------------------
	/*  trae los usuarios y los ordena               */
	//----------------------------------------------
	$('#listar').on('click',function (e) {
		e.preventDefault();
		$.get('/usuarios/liste',
			function(datos){
				for (var i = 0; i < datos.length; i++) {
				
					$('<div class="empleado">'+
							'<div class="nombre">'+ datos[i].nombre +'</div>'+
							'<div class="correo">'+ datos[i].correo +'</div>'+
							'<div class="bodega">'+ datos[i].bodega +'</div>'+
							'<div class="activa">'+ datos[i].activa +'</div>'+
						'</div>')
					.appendTo('#lienzo');
				};
			}
		);
	});
	//----------------------------------------------
	/*  busca un usuario                             */
	//----------------------------------------------
	$('#buscar').on('click',function (e) {
		e.preventDefault();
		var busqueda = $('#buscar').prev('input').val();
		if(busqueda!==''){
		$.get('/usuarios/'+busqueda,
			function(datos){
				if(typeof(datos)==='object'){
					$('#lienzo').append('<div>'+
									datos.nombre +
									datos.correo + 
									datos.activa +
					                '<div class="cerrarEste">cerrar</div> </div>');
				}else{
					$('#lienzo').append('<div>'+
										datos+
										'<div class="cerrarEste">cerrar</div> </div>');
				}
			}
		);
		}else{
			alert('porfavor llene el texto');
		}
	});
	
	//----------------------------------------------
	/*  añade un usuario                             */
	//----------------------------------------------
	$('#lienzo').on('click', '#nuevo',function (e) {
		e.preventDefault();
		var nombre = $('input[name=nombre]').val();
		var correo = $('input[name=correo]').val();
		var bodega = $('input[name=bodega]').val();
		var datos = {
			nombre:nombre,
			correo:correo,
			bodega:bodega
		};
		$.post('/usuarios/ingrese', datos,function (data) {
			$('#lienzo').children('div').remove();
			$('#lienzo').append('<div><p>'+ data +'</p> <div class="cerrarEste">cerrar</div></div>');
		});
	});
	//----------------------------------------------
	/*  saca lo de la panta                           */
	//----------------------------------------------
	$('#lienzo').on('click','.cerrarEste',function(){
		$(this)
		.parent('div')
		.fadeOut(function () {
			$(this).remove();
		});
	});
	//----------------------------------------------
	/*  elimina al usuario                           */
	//----------------------------------------------
	$('#lienzo').on('click', '#elimine',function (e) {
		e.preventDefault();
		var nombre = $('input[name=nombre]').val();
		var correo = $('input[name=correo]').val();
		var datos = {
			nombre:nombre,
			correo:correo
		};
		$.post('/usuarios/elimine', datos,function (data) {
			$('#lienzo').children('form').remove();
			$('#lienzo').append('<div><p>'+ data +'</p> <div class="cerrarEste">cerrar</div></div>');
		});
	});
	//----------------------------------------------
	/*  enlaces del menu                           */
	//----------------------------------------------
	$('#links li a').on('click',function (e) {
		e.preventDefault();
		switch(this.text){
			case 'Ingresar':
				$('#lienzo').append('<div><form class="menores">'+
										'<label for="nombre">Usuario:</label>'+
										'<input type="text" name="nombre" id="nombre" placeholder="nombre" required>'+
										'<label for="correo">Correo:</label>'+
										'<input type="email" name="correo" id="correo" placeholder="correo@correo.com" required>'+
										'<label for="bodega">Bodega:</label>'+
										'<input type="text" name="bodega" id="bodega" placeholder="bodega" required>'+
										'<input id="nuevo" type="submit" class="borde-gris sombra" value="Enviar">'+	
									'</form><div class="cerrarEste">cerrar</div></div>');
			break;
			case "Eliminar":
				$('#lienzo').append('<div><form class="menores">'+
										'<label for="nombre">nombre</label>'+
										'<input type="text" name="nombre" id="nombre" placeholder="nombre" required>'+
										'<label for="correo">correo</label>'+
										'<input type="email" name="correo" id="correo" placeholder="correo@correo.com" required>'+
										'<input id="elimine" type="submit" class="borde-gris sombra" value="Enviar">'+	
									'</form><div class="cerrarEste">cerrar</div></div>');
			break;
			default:
			break;
		}
	});
	//----------------------------------------------
	/* lo mimo que el de arriba pero para otro       */
	//----------------------------------------------
	$('#links2 li a').on('click',function (e) {
		e.preventDefault();
		switch(this.text){
			case "Nuevo":
					$('#lienzo').append('<section id="nuevoproducto" class="nuevo">'+
											'<form>'+
											'<label for="nombre">nombre:</label>'+
												'<input type="text" name="nombre" placeholder="nombre">'+
												'<input type="text" name="cantidad" placeholder="cantidad">'+
												'<input type="text" name="precio" placeholder="precio">'+
												'<input type="text" name="bodega" placeholder="bodega">'+
												'<input id="btnnuevo" type="submit" class="borde-gris">'+
											'</form>'+
										'</section>');
			break;
			case "Eliminar":
			
			break;
			case "Listar":

			break;
		}

	});
});