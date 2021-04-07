const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const Token = require('./../models/tokenModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const Joi = require('joi');
const sendSMS = require('../utils/sendSMS');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  // res.cookie('jwt', token, {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  //   secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  // });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: user,
  });
};

exports.signup = (req, res, next) => {
  User.findOne({ phone: req.body.phone }, function (err, user) {
    // error occur
    if (err) {
      return res.status(500).send({ msg: err.message });
    }
    // if phone is exist into database i.e. phone is associated with another user.
    else if (user) {
      return res.status(400).send({
        msg: 'This phone number is already associated with another account.',
      });
    }
    // if user is not exist into database then save the user into database for register account
    else {
      // create and save user
      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
      });

      user.save(function (err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        const otpCode = parseInt(Math.random() * 1000000);
        // generate token and save
        let token = new Token({
          _userId: user._id,
          token: otpCode,
        });

        token.save(function (err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          sendSMS(
            `Welcome to SSC .Your verification code :${token.token}`,
            `+977${req.body.phone}`
          );
          return res.status(200).json({
            status: 'success',
            message: `A verification code has been sent to ${user.phone} . It will be expire after 10 minutes. If you did not get verification code click on resend token.`,
          });
          // .then(() => {
          //   return res
          //     .status(200)
          //     .send(
          //       'A verification code has been sent to ' +
          //         user.phone +
          //         '. It will be expire after one day. If you did not get verification code click on resend token.'
          //     );
          // })
          // .catch((err) => {
          //   return res.status(500).send(err.message);
          // });
        });
      });
    }
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  });

  const { error } = schema.validate({
    email: req.body.email,
    password: req.body.password,
  });

  if (error) {
    return next(new AppError(`${error.details[0].message}`, 403));
  }

  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  if (user.role === 'admin') {
    return next(new AppError('Not for admin login', 401));
  }
  if (!user.isVerified) {
    return res.status(401).send({
      msg: 'Your Phone Number has not been verified. Please click on resend',
    });
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

exports.loginAdmin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  if (user.role === 'user') {
    return next(new AppError('Not for user login', 401));
  }

  createSendToken(user, 200, req, res);
  // 3) If everything ok, send token to client
});

// exports.logout = (req, res) => {
//   res.cookie('jwt', 'loggedout', {
//     expires: new Date(Date.now() + 10 * 1000),
//     httpOnly: true,
//   });
//   res.status(200).json({ status: 'success' });
// };

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // else if (req.cookies.jwt) {
  //   token = req.cookies.jwt;
  // }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  // res.locals.user = currentUser;
  next();
});

// Only for rendered pages, no errors!
// exports.isLoggedIn = async (req, res, next) => {
//   if (req.cookies.jwt) {
//     try {
//       // 1) verify token
//       const decoded = await promisify(jwt.verify)(
//         req.cookies.jwt,
//         process.env.JWT_SECRET
//       );

//       // 2) Check if user still exists
//       const currentUser = await User.findById(decoded.id);
//       if (!currentUser) {
//         return next();
//       }

//       // 3) Check if user changed password after the token was issued
//       if (currentUser.changedPasswordAfter(decoded.iat)) {
//         return next();
//       }

//       // THERE IS A LOGGED IN USER
//       res.locals.user = currentUser;
//       return next();
//     } catch (err) {
//       return next();
//     }
//   }
//   next();
// };

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action.', 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot Your Password? Submit a Patch Request with your new password and PasswordConfirm to : ${resetURL} \n If you did not forget your password , please ignore this message.`;

    await sendEmail({
      email: user.email,
      subject: 'Your password reset token valid for 10 minutes.',
      message,
    });
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, req, res);
});

// It is GET method, you have to write like that
//    app.get('/confirmation/:email/:token',confirmEmail)

exports.verifyNumber = function (req, res, next) {
  Token.findOne({ token: req.params.token }, function (err, token) {
    // token is not found into database i.e. token may have expired
    if (!token) {
      return res.status(400).send({
        msg:
          'Your verification code may have expired. Please click on resend for verify your number.',
      });
    }
    // if token is found then check valid user
    else {
      User.findOne(
        { _id: token._userId, phone: req.params.phone },
        function (err, user) {
          // not valid user
          if (!user) {
            return res.status(401).send({
              msg:
                'We were unable to find a user for this verification. Please SignUp!',
            });
          }
          // user is already verified
          else if (user.isVerified) {
            return res
              .status(200)
              .send('User has been already verified. Please Login');
          }
          // verify user
          else {
            // change isVerified to true
            user.isVerified = true;
            user.save(function (err) {
              // error occur
              if (err) {
                return res.status(500).send({ msg: err.message });
              }
              // account successfully verified
              else {
                return res
                  .status(200)
                  .send('Your account has been successfully verified');
              }
            });
          }
        }
      );
    }
  });
};

exports.resendCode = function (req, res, next) {
  User.findOne({ phone: req.body.phone }, function (err, user) {
    // user is not found into database
    if (!user) {
      return res.status(400).send({
        msg:
          'We were unable to find a user with that phone. Make sure your Phone number is correct!',
      });
    }
    // user has been already verified
    else if (user.isVerified) {
      return res
        .status(200)
        .send('This number has been already verified. Please log in.');
    }
    // send verification link
    else {
      const otpCode = parseInt(Math.random() * 1000000);
      // generate token and save
      let token = new Token({ _userId: user._id, token: otpCode });
      token.save(function (err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        sendSMS(
          `Your verification code :${token.token}`,
          `+977${req.body.phone}`
        )
          .then(() => {
            return res
              .status(200)
              .send(
                'A verification code has been sent to ' +
                  user.phone +
                  '. It will be expire after 10 mins. If you did not get verification code click on resend token.'
              );
          })
          .catch((err) => {
            return res.status(500).send(err.message);
          });
      });
    }
  });
};
