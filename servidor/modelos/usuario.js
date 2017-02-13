
const bcrypt   = require('bcrypt');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const rangos   = require('../constantes/arreglos');
const cadena   = require('../constantes/cadena');

const productoInformacion = new Schema({
	producto:{ type : Schema.Types.ObjectId, ref  : 'Productos'	},
	cantidad:{ type    : Number,		default : 1	}
}, { _id: false });

const historial = new Schema({
	canasta : [productoInformacion],
	total   :  Number,
	fecha   :  { type    : Date, default :  new Date() 	}
});


const usuario = new Schema({
	nombre: { type: String, required: true, march: /^[a-zA-Z_áéíóúñ\s]*$/  },
	apellido: { type: String, required: true, march: /^[a-zA-Z_áéíóúñ\s]*$/  },
	correo: { type: String, required: true },
	clave: { type: String, required: true },
	estado: { type: Boolean, defaul: true },
	rango: { type: String, enum: rangos.TIPOS_USUARIOS, default: cadena.NORMAL },
	canasta:[productoInformacion],
	historial
});

// antes de guardar
usuario.pre('save', function(next) {
	if(this.isModified('clave') || this.isNew){
		let salt = bcrypt.genSaltSync(10);
		let hash = bcrypt.hashSync(this.clave, salt); 
		this.clave = hash;
    next();
	}	
});

// comprobar contraseña
usuario.method('comprobarclave', function (clave) {
	return bcrypt.compareSync(this.clave, clave);
});

// eliminar campos no deseados
usuario.method('darFormato', function() {
	let obj = this.toObject();
	delete obj.__v;
	delete obj.clave;
	return obj;
});


module.exports = mongoose.model('usuario', usuario);