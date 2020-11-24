const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
//var secret = require('./secret/ASW');
AWS.config.update({
    accessKeyId: "",
    secretAccessKey: "",
    region: '',
    endpoint: "https://s3.amazonaws.com"
});

const s0 = new AWS.S3({});
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };
const upload = multer({
    storage: multerS3({
        s3: s0,
        bucket: 'cnms3',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, file.originalname);
        }

    }),
    limits: { fileSize: 5000000 }, // In bytes: 2000000 bytes = 2 MB
    // fileFilter: fileFilter,
    // // fileFilter: function (req, file, cb) {
    // //     checkFileType(file, cb);
    // // },
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase();
    }
});

exports.Upload = upload;