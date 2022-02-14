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
  checkPayment,
  getSingleOrder,
} = require('../controllers/ordersController');

/**
 * @access ALL
 * @description Check if payment is fulfilled or failed
 */
router.route('/checkPayment').get(checkPayment);

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
  .get(authController.restrictTo('user'), getSingleOrder)
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
