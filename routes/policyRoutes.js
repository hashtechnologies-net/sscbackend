const express = require('express');
const policy = require('../controllers/policyController');

const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(policyController.getAllPolicy)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    policyController.uploadPolicyPhoto,
    policyController.resizePolicyPhoto,
    policyController.createPolicy
  );

router
  .route('/:id')
  .get(policyController.getPolicy)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    policyController.uploadPolicyPhoto,
    policyController.resizePolicyPhoto,
    policyController.updatePolicy
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    policyController.deletePolicy
  );

module.exports = router;
