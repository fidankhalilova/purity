// config/multer.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ensureDirectoryExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = 'uploads/';

        if (file.fieldname === 'avatar') {
            uploadPath = 'uploads/avatars/';
        } else if (file.fieldname === 'productImage' || file.fieldname === 'productImages') {
            uploadPath = 'uploads/products/';
        } else if (file.fieldname === 'brandLogo') {
            uploadPath = 'uploads/brands/';
        } else if (file.fieldname === 'collectionImage') {
            uploadPath = 'uploads/collections/';
        } else if (file.fieldname === 'reviewImage') {
            uploadPath = 'uploads/reviews/';
        } else {
            uploadPath = 'uploads/general/';
        }

        ensureDirectoryExists(uploadPath);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const filename = file.fieldname + '-' + uniqueSuffix + ext;
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
        files: 10
    },
    fileFilter: fileFilter
});

module.exports = upload;