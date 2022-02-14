const router = require('express').Router();
const authController = require('./../controllers/authController');
const {
  getAllCategory,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

router.route('/').get(getAllCategory);
router.route('/:categoryName').get(getCategory);

// protected routes
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.route('/').post(createCategory);
router.route('/:categoryName').patch(updateCategory);
router.route('/:categoryId').delete(deleteCategory);

module.exports = router;
