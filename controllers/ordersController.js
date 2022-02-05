const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Orders = require('../models/orderModel');
const Users = require('../models/userModel');
const Products = require('../models/productsModel');
const axios = require('axios');

exports.createOrder = catchAsync(async (req, res, next) => {
  req.body.userId = req.user._id;
  req.body.products = req.user.cart;

  // check if cart is empty
  if (!req.body.products.length)
    return next(new AppError("Can't create order. Cart is empty.", 400));

  // check if payment is fullfilled and get products data
  const checkPaymentAndProducts = [];
  if (req.body.paymentType !== 'COD') {
    const type =
      req.body.paymentType === 'Esewa'
        ? 'esewaCredentials'
        : 'khaltiCredentials';
    checkPaymentAndProducts.push(
      axios.get(
        `https://esewa.com.np/epay/transrec?amt=${req.body[type].amt}&pid=${req.body[type].oid}&rid=${req.body[type].refId}&scd=${req.body[type].scd}`
      )
    );
  }

  req.body.products.map(({ productId }) =>
    checkPaymentAndProducts.push(Products.findById(productId))
  );

  const response = await Promise.all(checkPaymentAndProducts);

  req.body.paymentFulfilled = response[0].data?.includes('Success');

  // remove first response object from checkPaymentAndProducts
  req.body.paymentType !== 'COD' && response.shift();

  // merge price of products in products of order
  req.body.products = req.body.products.map((product, index) => {
    return {
      ...product.toObject(),
      ...response[index].toObject(),
      description: undefined,
      _id: undefined,
    };
  });

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

exports.getSingleOrder = catchAsync(async (req, res, next) => {
  const order = await Orders.findById(req.params.orderId);
  res.status(200).json(order);
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  let { sort, page, limit } = req.query;
  page = page && +page >= 1 ? +page : 1;
  limit = limit && +limit >= 10 ? +limit : 10;
  const skip = limit * (page - 1);

  delete req.query.page;
  delete req.query.sort;
  delete req.query.limit;

  const promises = [
    Orders.estimatedDocumentCount(),
    Orders.countDocuments({ status: 'Processing' }),
    Orders.countDocuments({ status: 'Delivered' }),
    Orders.countDocuments({ status: 'Received' }),
    Orders.countDocuments({ status: 'Cancelled' }),
    Orders.find({ userId: req.user._id, ...req.query })
      .sort(sort)
      .limit(limit)
      .skip(skip),
  ];

  const result = await Promise.all(promises);

  res.status(200).json({
    totalOrders: result[0],
    processing: result[1],
    delivered: result[2],
    received: result[3],
    cancelled: result[4],
    orders: result[5],
  });
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
  delete req.query.sort;

  const promises = [
    Orders.estimatedDocumentCount(),
    Orders.countDocuments({ status: 'Processing' }),
    Orders.countDocuments({ status: 'Delivered' }),
    Orders.countDocuments({ status: 'Received' }),
    Orders.countDocuments({ status: 'Cancelled' }),
    Orders.find(req.query).limit(limit).skip(skip).sort(sort),
  ];

  const result = await Promise.all(promises);

  res.status(200).json({
    totalOrders: result[0],
    processing: result[1],
    delivered: result[2],
    received: result[3],
    cancelled: result[4],
    orders: result[5],
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Orders.findById(req.params.orderId);
  res.status(200).json(order);
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

exports.checkPayment = catchAsync(async (req, res, next) => {
  const response = await axios.get(
    `https://esewa.com.np/epay/transrec?amt=${req.query.amt}&pid=${req.query.pid}&rid=${req.query.rid}&scd=${req.query.scd}`
  );

  if (response.data?.includes('Success')) {
    return res.status(200).json({ success: true });
  }
  res.status(200).json({ success: false });
});
