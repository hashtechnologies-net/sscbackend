const express = require('express');
const hospitalController = require('../controllers/hospitalController');

const authController = require('./../controllers/authController');

const router = express.Router();

router.use(
  hospitalController.uploadHospitalPhoto,
  hospitalController.resizeHospitalPhoto
);

// router.use(authController.protect);
router
  .route('/')
  .get(hospitalController.getAllHospitals)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    hospitalController.createHospital
  );

router
  .route('/:id')
  .get(hospitalController.getHospital)
  .patch(authController.restrictTo('admin'), hospitalController.updateHospital)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    hospitalController.deleteHospital
  );

module.exports = router;
