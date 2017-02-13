
module.exports = ({expect, request, cheerio}) => {

	describe('configuracion de administrador', () => {
		
		it('cargar el archivo index html', (done) => {
			request
			.get('/')
			.end((err, res) => {
				if(err) done(err);
				
				expect(res).to.have.status(200);
				expect(res).to.have.header('content-type', /html/);
				expect(res).to.be.html;

				done();
 			});
		});

		it('cargar el archivo configuracion html', (done) => {
			request
			.get('/configuracion')
			.end((err, res) => {
				if(err) done(err);
				
				expect(res).to.have.status(200);
				expect(res).to.have.header('content-type', /html/);
				expect(res).to.be.html;

				done();
 			});
		});

		it('guardar correctamente el administrador', (done) => {

			let administradorData = {
				nombre  : 'tio' ,
				apellido: 'sam',
				rango   : 'GENERAL',
				clave   : 'soytupapa',
				correo  : 'dominacion@mundial.us'
			};
			
			request
			.post('/configuracion')
			.send(administradorData)
			.end((err, res) => {
				if(err) done(err);
					
				expect(res).to.have.status(201);
				expect(res).to.have.header('content-type', /json/);
				expect(res).to.be.json;

				let body = res.body;

				expect(body).to.be.a('object');
				expect(body).to.have.property('mensaje');
				expect(body).to.have.property('estatus', true);
				expect(body).to.have.property('usuario');

				expect(body.usuario).to.be.a('object');
				expect(body.usuario).to.have.property('_id');
				expect(body.usuario).to.have.property('nombre');
				expect(body.usuario).to.have.property('apellido');
				expect(body.usuario).to.have.property('correo');
				done();
 			});
		
		});

		xit('no cargar la configuracion despues de haber guardado el administrador', (done) => {
			request
			.get('/configuracion')
			.end((err, res) => {
				if(err) done(err);

				expect(res).to.have.status(401);
				done();
 			});
		});

		xit('no guarda el administrador de nuevo', (done) => {

			let administradorData = {
				nombre  : 'tio' ,
				apellido: 'sam',
				rango   : 'GENERAL',
				clave   : 'soytupapa',
				correo  : 'dominacion@mundial.us'
			};
			
			request
			.post('/configuracion')
			.send(administradorData)
			.end((err, res) => {
				if(err) done(err);
					
				expect(res).to.have.status(401);
				done();
 			});

		});

	});

};