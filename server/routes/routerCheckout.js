const router = require('express').Router();
const controllerCheckout = require('../controllers/controllerCheckout');
const authentication = require('../middlewares/authentication');

router.use(authentication);

router.post('/', controllerCheckout.checkout);

module.exports = router;