const express = require('express');
const path = require('path');
const compression = require('compression');
const globalErrorHandler = require('./controllers/errorController');
const app = express();
// const fileupload = require('express-fileupload');

const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// ecommerce

const productRoutes = require('./routes/productsRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use(compression());
app.use(express.json());
// app.use(express.static(path.resolve(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV == 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use(mongoSanitize());
app.use(helmet());
app.use(xss());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 500,
  message: `Too many requests from this IP , please try again in a hour`,
});

app.use('/api', limiter);

// app.use(hpp());
app.use(cors());
// app.use(fileupload());

const appointmentRouter = require('./routes/appointmentRoutes');
const clinicRouter = require('./routes/clinicRoutes');
const doctorRouter = require('./routes/doctorRoutes');
const hospitalRouter = require('./routes/hospitalRoutes');
const pathlabRouter = require('./routes/pathlabRoutes');
const pharmacyRouter = require('./routes/pharmacyRoutes');
const rentalRouter = require('./routes/rentalRoutes');
const policyRouter = require('./routes/policyRoutes');
const userRouter = require('./routes/userRoutes');
const homeRouter = require('./routes/homeRoutes');
const AppError = require('./utils/appError');
const cartRouter = require('./routes/cartRoutes');

app.use('/', homeRouter);

app.use('/api/v1/appointment', appointmentRouter);
app.use('/api/v1/clinics', clinicRouter);
app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/hospitals', hospitalRouter);
app.use('/api/v1/pathlabs', pathlabRouter);
app.use('/api/v1/pharmacy', pharmacyRouter);
app.use('/api/v1/rentals', rentalRouter);
app.use('/api/v1/policy', policyRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/users/cart', cartRouter);

// ecommerce

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/categories', categoryRoutes);

app.all('*', (req, res, next) => {
<<<<<<< HEAD
<<<<<<< HEAD
    
    next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
=======
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
>>>>>>> 64ec81c026c9b33571dbae4cc00ed8e6fd1c0a1b
=======
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
>>>>>>> 4b9196034a5b850619963f4f0ecc0600c69ee747
});



app.use(globalErrorHandler);

module.exports = app;
