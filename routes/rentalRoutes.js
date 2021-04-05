const express = require('express');

const rentalController = require('./../controllers/rentalController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(rentalController.getAllRentals)
  .post(authController.restrictTo('user'), rentalController.createRental);

router
  .route('/:id')
  .get(rentalController.getRental)
  .patch(authController.restrictTo('admin'), rentalController.updateRental)
  .delete(authController.restrictTo('admin'), rentalController.deleteRental);

module.exports = router;
