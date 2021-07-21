const express = require('express');

const rentalController = require('./../controllers/rentalController');
const authController = require('./../controllers/authController');
const router = express.Router();





router
  .route('/')
  .get(rentalController.getAllRentals)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    rentalController.createRental
  );

router
  .route('/:id')
  .get(rentalController.getRental)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    rentalController.updateRental
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    rentalController.deleteRental
  );

module.exports = router;
