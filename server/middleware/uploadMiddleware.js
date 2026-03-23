const upload = require('../config/multer');
const path = require('path');

// Single file upload
const uploadSingle = (fieldName) => {
    return (req, res, next) => {
        const uploadSingleFile = upload.single(fieldName);

        uploadSingleFile(req, res, (err) => {
            if (err) {
                return res.status(400).json({ success: false, message: err.message });
            }

            if (req.file) {
                // Generate the URL for the uploaded file
                const filePath = req.file.path.replace(/\\/g, '/');
                req.file.url = `/uploads/${path.relative('uploads', filePath)}`;
            }

            next();
        });
    };
};

// Multiple files upload
const uploadMultiple = (fieldName, maxCount = 10) => {
    return (req, res, next) => {
        const uploadMultipleFiles = upload.array(fieldName, maxCount);

        uploadMultipleFiles(req, res, (err) => {
            if (err) {
                return res.status(400).json({ success: false, message: err.message });
            }

            if (req.files && req.files.length > 0) {
                req.files = req.files.map(file => ({
                    ...file,
                    url: `/uploads/${path.relative('uploads', file.path)}`
                }));
            }

            next();
        });
    };
};

// Upload with different fields
const uploadFields = (fields) => {
    return (req, res, next) => {
        const uploadFieldsMiddleware = upload.fields(fields);

        uploadFieldsMiddleware(req, res, (err) => {
            if (err) {
                return res.status(400).json({ success: false, message: err.message });
            }

            if (req.files) {
                for (const [fieldName, files] of Object.entries(req.files)) {
                    req.files[fieldName] = files.map(file => ({
                        ...file,
                        url: `/uploads/${path.relative('uploads', file.path)}`
                    }));
                }
            }

            next();
        });
    };
};

module.exports = {
    uploadSingle,
    uploadMultiple,
    uploadFields
};