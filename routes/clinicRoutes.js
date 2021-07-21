const express = require('express');
const clinicController = require('../controllers/clinicController');

const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(clinicController.getAllClinics)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    clinicController.uploadClinicPhoto,
    clinicController.resizeClinicPhoto,
    clinicController.createClinic
  );

router
  .route('/:id')
  .get(clinicController.getClinic)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    clinicController.uploadClinicPhoto,
    clinicController.resizeClinicPhoto,
    clinicController.updateClinic
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    clinicController.deleteClinic
  );

module.exports = router;
