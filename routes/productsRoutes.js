const router = require('express').Router();
const authController = require('./../controllers/authController');
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productsController');

router.route('/').get(getAllProducts);
router.route('/:productId').get(getProduct);

// protected routes
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.route('/').post(createProduct);
router.route('/:productId').patch(updateProduct).delete(deleteProduct);

module.exports = router;
