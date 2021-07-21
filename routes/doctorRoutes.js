const express = require('express');
const doctorController = require('../controllers/doctorController');

const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(doctorController.getAllDoctors)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    doctorController.uploadDoctorPhoto,
    doctorController.resizeDoctorPhoto,
    doctorController.createDoctor
  );

router
  .route('/:id')
  .get(doctorController.getDoctor)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    doctorController.uploadDoctorPhoto,
    doctorController.resizeDoctorPhoto,
    doctorController.updateDoctor
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    doctorController.deleteDoctor
  );

module.exports = router;
