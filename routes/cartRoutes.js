const router = require('express').Router();
const authController = require('../controllers/authController');
const {
  addToCart,
  updateQuantity,
  removeFromCart,
} = require('../controllers/cartController');

// protected routes
router.use(authController.protect);
router.use(authController.restrictTo('user'));

router.route('/').post(addToCart);
router.route('/:productId').patch(updateQuantity).delete(removeFromCart);

module.exports = router;
