const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signup/sendotp', authController.sendOTP);
router.post('/signup/verify-otp', authController.verifOTP);
router.post('/login', authController.login);
router.post('/loginAdmin', authController.loginAdmin);

router.post('/forgotPassword', authController.forgotPassword);
router.post('/verifyNumber', authController.verifOTP);
router.post('/changePassword', authController.setPassword);


// router.patch('/resetPassword/:token', authController.resetPassword);

// router.get('/confirmation/:phone/:token', authController.verifyNumber);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.post(
  '/setPassword',
  authController.protect,
  authController.setPassword
);
router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser
);
router.patch(
  '/updateMe',
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router
  .route('/admin')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getAllUsers
  )
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    userController.createUser
  );

router
  .route('/admin/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getUser
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser
  );

module.exports = router;
