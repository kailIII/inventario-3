require('mocha');

process.env.NODE_ENV = 'test';

const chai     = require('chai');
const chaihttp = require('chai-http');
const cheerio  = require('cheerio');

const conexion = require('../servidor/configuracion/conexion');
const servidor = require('../servidor');


chai.use(chaihttp);

const expect  = chai.expect;
const request = chai.request(servidor);
const utils   = { expect, request, cheerio };

describe('pruebas al inventario', () => {

  before('se conecta y elimina datos existentes', (done) => {
        conexion(process.env.NODE_ENV, (conexionMongo) => {
          conexionMongo.db.dropDatabase(() => {
              done();
          });
      });
  });

	require('./configuracion')(utils);
	require('./usuario')(utils);
});