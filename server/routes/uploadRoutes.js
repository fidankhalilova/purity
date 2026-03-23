const express = require('express');
const router = express.Router();
const { uploadSingle, uploadMultiple } = require('../middleware/uploadMiddleware');

// Brand logo upload
router.post('/brand-logo', uploadSingle('brandLogo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    console.log('Uploaded file:', req.file); // Debug log

    res.status(200).json({
        success: true,
        data: {
            filename: req.file.filename,
            url: req.file.url,  // This is the path: /uploads/brands/...
            originalName: req.file.originalname,
            size: req.file.size
        }
    });
});

// Collection image upload
router.post('/collection-image', uploadSingle('collectionImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    res.status(200).json({
        success: true,
        data: {
            filename: req.file.filename,
            url: req.file.url,
            originalName: req.file.originalname,
            size: req.file.size
        }
    });
});

// Product image upload
router.post('/product-image', uploadSingle('productImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    res.status(200).json({
        success: true,
        data: {
            filename: req.file.filename,
            url: req.file.url,
            originalName: req.file.originalname,
            size: req.file.size
        }
    });
});

// Review image upload
router.post('/review-image', uploadSingle('reviewImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    res.status(200).json({
        success: true,
        data: {
            filename: req.file.filename,
            url: req.file.url,
            originalName: req.file.originalname,
            size: req.file.size
        }
    });
});

module.exports = router;