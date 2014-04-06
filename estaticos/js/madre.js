$(document).ready(function(){
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
				$('#lienzo').append(datos.nombre+'\n'+datos.correo+'\n'+datos.activa);
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
			$('#lienzo').children('form').remove();
			$('#lienzo').append('<div><p>'+ data +'</p> <div class="cerrarEste">cerrar</div></div>');
		});
	});
	//----------------------------------------------
	/*  saca lo de la panta                           */
	//----------------------------------------------
	$('#lienzo').on('click','.cerrarEste',function(){
		$('#lienzo').children('div').fadeOut(function () {
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
				$('#lienzo').append('<form class="menores">'+
										'<label for="nombre">Usuario:</label>'+
										'<input type="text" name="nombre" id="nombre" placeholder="nombre" required>'+
										'<label for="correo">Correo:</label>'+
										'<input type="email" name="correo" id="correo" placeholder="correo@correo.com" required>'+
										'<label for="bodega">Bodega:</label>'+
										'<input type="text" name="bodega" id="bodega" placeholder="bodega" required>'+
										'<input id="nuevo" type="submit" class="borde-gris sombra" value="Enviar">'+	
									'</form>');
			break;
			case "Eliminar":
				$('#lienzo').append('<form class="menores">'+
										'<label for="nombre">nombre</label>'+
										'<input type="text" name="nombre" id="nombre" placeholder="nombre" required>'+
										'<label for="correo">correo</label>'+
										'<input type="email" name="correo" id="correo" placeholder="correo@correo.com" required>'+
										'<input id="elimine" type="submit" class="borde-gris sombra" value="Enviar">'+	
									'</form>');
			break;
			default:
			break;
		}
	});
});