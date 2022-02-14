const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const Products = require('../models/productsModel');
const AppError = require('../utils/appError');

exports.addToCart = catchAsync(async (req, res, next) => {
  const product = await Products.findById(req.body.productId);

  // product should exist to be added to cart
  if (!product)
    return next(
      new AppError("Product can't be added to cart. Product doesn't exist.")
    );

  // stock should also be available
  if (req.body.quantity > product.stock)
    return next(
      new AppError('Product quantity is more than we have on our stock.')
    );

  // if product already exists in cart, just update the quantity
  if (
    req.user.cart.find(
      ({ productId }) => productId.toString() === req.body.productId
    )
  ) {
    const user = await User.findOneAndUpdate(
      { 'cart.productId': req.body.productId },
      { $set: { 'cart.$.quantity': req.body.quantity } },
      { new: true }
    );

    return res.status(200).json(user);
  }

  // else add new product with quantity in cart
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { cart: req.body },
    },
    { new: true }
  );
  res.status(200).json(user);
});

exports.updateQuantity = catchAsync(async (req, res, next) => {
  const product = await Products.findById(req.params.productId);

  // product should exist to be added to cart
  if (!product)
    return next(
      new AppError("Product can't be added to cart. Product doesn't exist.")
    );

  // stock should be available
  if (req.body.quantity > product.stock)
    return next(
      new AppError('Product quantity is more than we have on our stock.')
    );

  const user = await User.findOneAndUpdate(
    { 'cart.productId': req.params.productId },
    { $set: { 'cart.$.quantity': req.body.quantity } },
    { new: true }
  );

  if (!user)
    return next(
      new AppError(
        400,
        `There is no product with productId: ${req.params.productId}`
      )
    );

  res.status(200).json(user);
});

exports.removeFromCart = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { cart: { productId: req.params.productId } },
    },
    { new: true }
  );

  res.status(200).json(user);
});
