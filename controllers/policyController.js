const Policy = require('../models/policyModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const nodemailer = require('nodemailer')
const path = require('path');
sscCardNumberGenerator = require('creditcard-generator');

const multer = require('multer');
const { default: axios } = require('axios');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'citizenship_front') {
            cb(null, 'public/img/policies/');
        } else if (file.fieldname === 'citizenship_back') {
            cb(null, 'public/img/policies/');
        } else if (file.fieldname === 'nominee_photo') {
            cb(null, 'public/img/policies/');
        }
    },
    filename: (req, file, cb) => {
        if (file.fieldname === 'citizenship_front') {
            cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
        } else if (file.fieldname === 'citizenship_back') {
            cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
        } else if (file.fieldname === 'nominee_photo') {
            cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
        }
    },
});

function checkFileType(file, cb) {
    if (file.fieldname === 'citizenship_front') {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg' ||
            fiel.mimetype === 'image/gif'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    } else if (
        file.fieldname === 'citizenship_back' ||
        file.fieldname === 'nominee_photo'
    ) {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg' ||
            fiel.mimetype === 'image/gif'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
}

// const MLM_URI = (process.env.NODE_ENV=="development")? "http://localhost:5001":"url";

exports.uploadPolicyPhoto = (req, res, next) => {
    console.log(req.body,req.files)
    // if (!req.body.policy_holder_image ||
    //     !req.body.citizenship_front ||
    //     !req.body.citizenship_back
    // ) {
    //     return next(
    //         new AppError(
    //             `Please provide a policy holder photo , citizenship front side and citizenship back side.`,
    //             400
    //         )
    //     );
    // }
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 100,
        },
        fileFilter: (req, file, cb) => {
            checkFileType(file, cb);
        },
    }).fields([{
            name: 'citizenship_front',
            maxCount: 1,
        },
        {
            name: 'citizenship_back',
            maxCount: 1,
        },
        {
            name: 'nominee_photo',
            maxCount: 1,
        },
        {
            name:'policy_holder_image',
            maxCount:1,
        }
    ]);

    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return next(new AppError(`Error uploading the files, Multer error`, 400));
        } else if (err) {
            // An unknown error occurred when uploading.
            return next(new AppError(`Error uploading the files`, 500));
        }
        // Everything went fine.
        next();
    });
};

exports.createPolicy = catchAsync(async(req, res, next) => {
    if (!req.files) {
        return new AppError(
            "Please upload citizenship front and back photo",
            400
        );
    }

    if (req.files.citizenship_front) {
        req.body.citizenship_front = `${req.protocol}://${req.get(
      'host'
    )}/img/policies/${req.files.citizenship_front[0].filename}`;
    }

    if (req.files.citizenship_back) {
        req.body.citizenship_back = `${req.protocol}://${req.get(
      'host'
    )}/img/policies/${req.files.citizenship_back[0].filename}`;
    }

    if (req.files.nominee_photo) {
        req.body.nominee_photo = `${req.protocol}://${req.get(
      'host'
    )}/img/policies/${req.files.nominee_photo[0].filename}`;
    }

    if (req.files.policy_holder_image) {
        req.body.policy_holder_image = `${req.protocol}://${req.get(
      'host'
    )}/img/policies/${req.files.policy_holder_image[0].filename}`;
    }

    let invalid = true

    while (invalid) {
        req.body.card_number = sscCardNumberGenerator.GenCC().toString();
        const existPolicy =  await Policy.find({card_number: req.body.card_number})
        invalid = (existPolicy.length > 0) ? true : false
      }
    
    
      newPolicy = await Policy.create(req.body);
      if(newPolicy){
        axios.post(MLM_URI,newPolicy).then(res=>{
            console.log(res)
        })
        return res.status(201).json({ status: 'success', data: newPolicy });
      }
    return next(new AppError(`Error Creating policy`, 500));
});

exports.getAllPolicy = catchAsync(async(req, res, next) => {
    const { first_name, middle_name, last_name } = req.query;

    const regex = new RegExp(first_name, 'i');
    const regex2 = new RegExp(middle_name, 'i');
    const regex3 = new RegExp(last_name, 'i');
    const features = new APIFeatures(Policy.find(), req.query)
        .filter({ first_name: regex, middle_name: regex2, last_name: regex3 })
        .sort()
        .limitFields()
        .paginate();
    const policy = await features.query;
    const policyCount = await Policy.countDocuments();

    return res.status(200).json({
        status: 'success',
        data: policy,
        policyCount,
    });
});

exports.getPolicy = catchAsync(async(req, res, next) => {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
        return next(new AppError('No Policy found with that id', 404));
    }
    res.status(200).json({ status: 'success', data: policy });
});

exports.updatePolicy = catchAsync(async(req, res, next) => {
    const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
    });

    if(policy && policy.isPaid===true){
    const userName = policy.first_name+" "+policy.last_name
      const {amount, phone, email, card_number} = policy
      const MessageText = `Dear ${userName}, Thankyou for subscribing SSCard.\nCard Type: ${amount} \nSSC Number: ${card_number}`
          
        if (email) {
           
            let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              service:"google",
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
              },
          
            });
          
            transporter.verify(function(error, success) {
              if (error) {
                console.log(error);
              } else {
                let mailData = {
                  from: "Swasthya Samriddhi Card",
                  to: email,
                  subject: "Swasthya Samriddhi Card",
                  text: MessageText
                }
                transporter.sendMail(mailData,(err,success)=>{
                  console.log(err,success)
                })
              }
            });
          }

            if (phone) {
               axios.get(`http://api.sparrowsms.com/v2/sms?token=${process.env.SPARROW_TOKEN}&from=SSC_ALERT&to=${phone}&text=${MessageText}`).then(res=>{
                 if (res.data.response_code==200) {
                    console.log("Message sent");
                 }
               }).catch(error=>console.log(error))
            }
      
        
    }

    if (!policy) {
        return next(new AppError('No policy found with that id', 404));
    }
    res.status(200).json({ status: 'success', data: policy });
});

exports.deletePolicy = catchAsync(async(req, res, next) => {
    const policy = await Policy.findByIdAndDelete(req.params.id);

    if (!policy) {
        return next(new AppError('No policy found with that id', 404));
    }
    res.status(204).json({ status: 'success', data: {} });
});