const express = require('express');
const appointment = require('../controllers/appointmentController');

const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(authController.restrictTo('admin'), appointment.getAllAppointments)
  .post(authController.restrictTo('user'), appointment.createAppointment);

router
  .route('/:id')
  .get(appointment.getAppointment)
  .patch(authController.restrictTo('admin'), appointment.updateAppointment)
  .delete(authController.restrictTo('admin'), appointment.deleteAppointment);

module.exports = router;
