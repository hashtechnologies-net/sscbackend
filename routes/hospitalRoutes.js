const express = require('express');
const hospitalController = require('../controllers/hospitalController');

const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(hospitalController.getAllHospitals)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    hospitalController.uploadHospitalPhoto,
    hospitalController.resizeHospitalPhoto,
    hospitalController.createHospital
  );

router
  .route('/:id')
  .get(hospitalController.getHospital)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    hospitalController.uploadHospitalPhoto,
    hospitalController.resizeHospitalPhoto,
    hospitalController.updateHospital
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    hospitalController.deleteHospital
  );

module.exports = router;
