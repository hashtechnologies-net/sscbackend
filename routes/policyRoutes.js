const express = require('express');
const policyController = require('../controllers/policyController');

const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(policyController.getAllPolicy)
  .post(
    policyController.uploadImages,
    policyController.resizePolicyPhoto,
    policyController.createPolicy
  );

router
  .route('/:id')
  .get(policyController.getPolicy)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    policyController.uploadImages,
    policyController.resizePolicyPhoto,
    policyController.updatePolicy
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    policyController.deletePolicy
  );

module.exports = router;
