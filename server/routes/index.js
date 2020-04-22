const router = require('express').Router();
const controllerCustomer = require('../controllers/controllerCustomer');
const errorHandler = require('../middlewares/errorHandler');
const routerProduct = require('./routerProduct');
const routerCart = require('./routerCart');

router.post('/login', controllerCustomer.login);

router.post('/register', controllerCustomer.register);

router.use('/products', routerProduct);

router.use('/carts', routerCart);

// router.use('/checkout', routerCheckout);

router.use(errorHandler);

module.exports = router;