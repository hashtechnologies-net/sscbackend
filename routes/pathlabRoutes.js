const express = require('express');
const pathlabController = require('../controllers/pathlabController');

const authController = require('./../controllers/authController');

const router = express.Router();

router.use(
  pathlabController.uploadPathlabPhoto,
  pathlabController.resizePathlabPhoto
);

router
  .route('/')
  .get(pathlabController.getAllPathlabs)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    pathlabController.createPathlab
  );

router
  .route('/:id')
  .get(pathlabController.getPathlab)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    pathlabController.updatePathlab
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    pathlabController.deletePathlab
  );

module.exports = router;
