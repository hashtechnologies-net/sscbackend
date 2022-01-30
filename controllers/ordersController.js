const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Orders = require('../models/orderModel');
const Users = require('../models/userModel');
const Products = require('../models/productsModel');

exports.createOrder = catchAsync(async (req, res, next) => {
  req.body.userId = req.user._id;
  req.body.products = req.user.cart;

  if (!req.body.products.length)
    return next(new AppError("Can't create order. Cart is empty.", 400));

  // create order
  // empty user's cart
  // decrease stock of all the products
  const promises = [
    Orders.create(req.body),
    Users.findByIdAndUpdate(req.user._id, { cart: [] }),
  ];

  req.body.products?.map(({ productId, quantity }) => {
    promises.push(
      Products.findByIdAndUpdate(
        productId,
        { $inc: { stock: quantity * -1 } },
        { new: true }
      )
    );
  });

  const order = await Promise.all(promises);
  res.status(200).json(order[0]);
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  let { sort, page, limit } = req.query;
  page = page && +page >= 1 ? +page : 1;
  limit = limit && +limit >= 10 ? +limit : 10;
  const skip = limit * (page - 1);

  const orders = await Orders.find({ userId: req.user._id })
    .sort(sort)
    .limit(limit)
    .skip(skip);

  res.status(200).json(orders);
});

exports.cancelUserOrder = catchAsync(async (req, res, next) => {
  const order = await Orders.findByIdAndUpdate(
    req.params.orderId,
    {
      status: 'Cancelled',
    },
    { new: true }
  );

  const promises = [];

  order?.products.map(({ productId, quantity }) => {
    promises.push(
      Products.findByIdAndUpdate(
        productId,
        { $inc: { stock: quantity } },
        { new: true }
      )
    );
  });

  const products = await Promise.all(promises);

  res.status(200).json(order);
});

exports.getOrders = catchAsync(async (req, res, next) => {
  let { sort, page, limit } = req.query;
  page = page && +page >= 1 ? +page : 1;
  limit = limit && +limit >= 10 ? +limit : 10;
  const skip = limit * (page - 1);

  delete req.query.page;
  delete req.query.limit;

  const orders = await Orders.find(req.query)
    .limit(limit)
    .skip(skip)
    .sort(sort);

  res.status(200).json(orders);
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const order = await Orders.findByIdAndUpdate(req.params.orderId, req.body, {
    new: true,
  });
  res.status(200).json(order);
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  await Orders.findByIdAndDelete(req.params.orderId);
  res.status(204).json();
});