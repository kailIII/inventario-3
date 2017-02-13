Inventario
==========

manejador de inventario nodejs, express, mongoose

	modelos

	usuario { nombre, contraseña, apellido, dirrecion, telefono, tipo }
	bodega { nombre, dirrecion, productos, opciones{ edicionTipo, verTipo } }
	producto { nombre, descripcion, valor, cantidad, carracteristicas, subproductos, prioridad	}

	controles
	
	index	
		/
		get - html
		post - 
			
		/login
			get	- html formulario
			post - crea session

		/configuracion
			get - html formulario
			post - se crea Administrador

			solo funciona una vez

		/administrador
			get - html (seria como un perfil)
			post 
			get:id json


		/usuarios
			crud

		/productos
			crud
			get html


		/compras 
			/estadisticas
	bodega  (crud) (edición de productos), (ver productos), (estadisticas) 	
	productos (crud) (estadisticas por producto)

	ingresa una vez para ingresar el primer usuario
	se crean usuarios
	hay puede cambiar usuarios 




entornos:
desarrollo 
producción
pruebas

como se ejecutan:


npm start
npm test
npm run dev

cliente:

npm run build

1 tareas una base de datos para todos los entornos
2 crear datos con faker (solo tengo uno por el momento)
3 revisar el flujo de usuario normal

crear tablas que muestren la informacion de bodegas
de usuarios y de productos (uno para el admin y otro para los usuarios normales)
cada uno debe tener  eliminacion, edicion y creacion (que son links a otros o a consumir el api)
la edicion y la creacion pueden ser un mismo formulario 

administrador
ve bodegas
ve usuarios
ve productos

administrador super
ve administradores
y todo lo demas

usarios
ve productos