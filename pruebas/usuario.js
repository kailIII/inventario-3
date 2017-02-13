const UsuarioModelo = require('../servidor/modelos/usuario');
const dataUsuario   = require('./data/usuario');

module.exports = ({expect, request, cheerio}) => {

	describe('pruebas de usuarios', () => {

		let nuevoUsuario = new UsuarioModelo(dataUsuario.usuario);

		before('nuevo usuario', done => {
			nuevoUsuario.save(done);		
		});

		it('deberia crear un usuario normal', done => {
			let usuarioRegistro = dataUsuario.usuario;

			request
			.post('/registro')
			.send(usuarioRegistro)
			.end((err, res) => { 
				if(err) done(err);
				expect(res).to.be.json;
				expect(res).to.have.status(201);
				expect(res.body).to.have.property('estatus');
				expect(res.body).to.have.property('usuario');
				done();
 			});

		});

		it('deberia realizar login', done => {
			request
			.post('/ingresar')
			.send(nuevoUsuario)
			.end((err, res) => { 
				if(err) done(err);
				expect(res).to.be.json;
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('estatus');
				expect(res.body).to.have.property('usuario');

				done();
 			});
		});

		it('deberia traer su usuario', done => {
			request
			.post(`/usuario/${nuevoUsuario._id}`)
			.end((err, res) => {
				if(err) done(err);
				
				expect(res).to.be.json;
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('usuario');
				expect(res.body.usuario).to.be.a('object');
				expect(res.body.usuario).to.have.property('_id');

				done();
 			});
		});

		xit('deberia actualizar informacion del usuario', (done) => {
			let cambios = {

			};

			request
			.put(`/usuario/${nuevoUsuario._id}`)
			.send(datos)
			.end((err, res) => {
				if(err) done(err);
				
				expect(res).to.be.json;
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('usuario');
				expect(res.body.usuario).to.be.a('object');
				expect(res.body.usuario).to.have.property('_id');

				done();
 			});
		});
	});

};