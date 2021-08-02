const Policy = require('../models/policyModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const nodemailer = require('nodemailer')
const path = require('path');
sscCardNumberGenerator = require('creditcard-generator');

const multer = require('multer');

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

exports.uploadPolicyPhoto = (req, res, next) => {
    // if (!req.body.nominee_photo ||
    //     !req.body.citizenship_front ||
    //     !req.body.citizenship_back
    // ) {
    //     return next(
    //         new AppError(
    //             `Please provide a nominee photo , citizenship front side and citizenship back side.`,
    //             400
    //         )
    //     );
    // }
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 10,
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
            "Please upload citizenship front and back photo and a nominee's passport size photo",
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

    while (invalid) {
        req.body.card_number = sscCardNumberGenerator.GenCC().toString();
        const existPolicy =  await Policy.find({card_number: req.body.card_number})
        invalid = (existPolicy.length > 0) ? true : false
      }
    
      const userName = req.body.first_name+" "+req.body.last_name
      const {amount, phone, email, card_number} = req.body
    
      const MessageText = `Dear ${userName}, Thankyou for subscribing SSCard.\n Card Type: ${amount} \n SSC Number: ${card_number}`
    
      if (email) {
      
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        service:"google",
        auth: {
          user: "campaigns@swasthyasamriddhi.com",
          pass: "Campaigns@himitsu1"
        },
         
    
      });
    
      transporter.verify(function(error, success) {
        if (error) {
          console.log(error);
        } else {
          // console.log("Server is ready to take our messages");
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
        
         axios.get(`http://api.sparrowsms.com/v2/sms?token=v2_omEJeBXDIfKjKngaclZLxK8igfa.mA85&from=Demo&to=${phone}&text=${MessageText}`).then(res=>{
           if (res.data.response_code==200) {
              console.log("Message sent");
           }
         }).catch(error=>console.log(error))
      }

    newPolicy = await Policy.create(req.body);
    res.status(201).json({ status: 'success', data: newPolicy });
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