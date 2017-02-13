const faker = require('faker');


module.exports = {
	usuario:{
		nombre  : faker.name.firstName(),
		apellido: faker.name.lastName(),
		correo  : faker.internet.email(),
		clave   : faker.internet.password(),
		rango   : 'general'
	}
};