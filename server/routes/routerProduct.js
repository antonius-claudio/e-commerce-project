const router = require('express').Router();
const controllerProduct = require('../controllers/controllerProduct');
const authentication = require('../middlewares/authentication');

router.get('/', controllerProduct.getAll);

router.use(authentication);

router.put('/:id', controllerProduct.updateStock);

module.exports = router;