const router = require('express').Router();
const authController = require('./../controllers/authController');
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  readImage,
  resizeImage,
} = require('../controllers/productsController');

router.route('/').get(getAllProducts);
router.route('/:productId').get(getProduct);

// protected routes
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.route('/').post(readImage, resizeImage, createProduct);
router
  .route('/:productId')
  .patch(readImage, resizeImage, updateProduct)
  .delete(deleteProduct);

module.exports = router;
