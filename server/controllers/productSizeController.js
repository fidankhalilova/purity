const ProductSize = require('../models/ProductSize');

const getAllProductSizes = async (req, res) => {
    try {
        const sizes = await ProductSize.find().sort({ ml: 1 });
        res.status(200).json({ success: true, data: sizes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getProductSizeById = async (req, res) => {
    try {
        const size = await ProductSize.findById(req.params.id);
        if (!size) {
            return res.status(404).json({ success: false, message: 'Size not found' });
        }
        res.status(200).json({ success: true, data: size });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createProductSize = async (req, res) => {
    try {
        const size = new ProductSize(req.body);
        await size.save();
        res.status(201).json({ success: true, data: size });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateProductSize = async (req, res) => {
    try {
        const size = await ProductSize.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!size) {
            return res.status(404).json({ success: false, message: 'Size not found' });
        }
        res.status(200).json({ success: true, data: size });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteProductSize = async (req, res) => {
    try {
        const size = await ProductSize.findByIdAndDelete(req.params.id);
        if (!size) {
            return res.status(404).json({ success: false, message: 'Size not found' });
        }
        res.status(200).json({ success: true, message: 'Size deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllProductSizes,
    getProductSizeById,
    createProductSize,
    updateProductSize,
    deleteProductSize
};