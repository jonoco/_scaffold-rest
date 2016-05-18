const passportService = require('./services/passport');
const passport        = require('passport');
const router          = require('express').Router();

const BaseController  = require('./controllers/base');
const AuthController  = require('./controllers/authentication');
const MesgController  = require('./controllers/message');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.get('/', BaseController.root);
router.post('/signup', AuthController.signup);
router.post('/login', requireSignin, AuthController.login);
router.post('/message', requireAuth, MesgController.postMessage);
router.get('/message', MesgController.getMessages);

module.exports = router;
