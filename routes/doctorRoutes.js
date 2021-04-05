const express = require('express');
const doctorController = require('../controllers/doctorController');

const authController = require('./../controllers/authController');

const router = express.Router();

router.use(
  doctorController.uploadDoctorPhoto,
  doctorController.resizeDoctorPhoto
);

router
  .route('/')
  .get(doctorController.getAllDoctors)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    doctorController.createDoctor
  );

router
  .route('/:id')
  .get(doctorController.getDoctor)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    doctorController.updateDoctor
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    doctorController.deleteDoctor
  );

module.exports = router;
