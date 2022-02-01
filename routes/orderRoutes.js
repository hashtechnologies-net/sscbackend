const router = require('express').Router();
const authController = require('./../controllers/authController');
const {
  createOrder,
  getMyOrders,
  cancelUserOrder,
  getOrders,
  updateOrder,
  deleteOrder,
  getOrder,
} = require('../controllers/ordersController');

// protected routes
router.use(authController.protect);

/**
 * @access user
 * @description CREATE, READ, CANCEL orders
 */
router
  .route('/user')
  .post(authController.restrictTo('user'), createOrder)
  .get(authController.restrictTo('user'), getMyOrders);

router
  .route('/user/:orderId')
  .patch(authController.restrictTo('user'), cancelUserOrder);

// -------------------------------------------------------------

/**
 * @access admin
 * @description READ, UPDATE, DELETE orders
 */
router.use(authController.restrictTo('admin'));
router.route('/admin').get(getOrders);
router
  .route('/admin/:orderId')
  .get(getOrder)
  .patch(updateOrder)
  .delete(deleteOrder);

module.exports = router;
