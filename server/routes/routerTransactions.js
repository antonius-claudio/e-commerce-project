const router = require('express').Router();
const controllerTransactions = require('../controllers/controllerTransactions');
const controllerCheckoutProduct = require('../controllers/controllerCheckoutProduct');
const authentication = require('../middlewares/authentication');

router.use(authentication);

router.get('/', controllerTransactions.getAll);

router.get('/:id', controllerCheckoutProduct.getAll);

module.exports = router;