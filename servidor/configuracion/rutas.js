const passport = require('passport');

const raiz     = require('../controles/raiz');
const usuario  = require('../controles/usuario');

const cadena = require('../constantes/cadena');


const configuracion = require('../middleware/configuracion');
const sesion        = require('../middleware/sesion');


const router  = require('express').Router();


router.get('/', raiz.raiz);
router.get('/configuracion', configuracion(cadena.GENERAL), raiz.configuracion);
router.post('/configuracion', configuracion(cadena.GENERAL), raiz.ingresarAdmin);

router.post('/ingresar', passport.authenticate('autentificar'),  usuario.ingresar);
router.post('/registro',  usuario.registro);

router.post('/usuarios', sesion.denegar(cadena.NORMAL), usuario.crear);
router.get('/usuarios/:usuarioId', sesion.denegar(cadena.NORMAL), usuario.consegir);
router.get('/perfil', sesion.denegar(cadena.NORMAL), usuario.consegir);

module.exports = router;