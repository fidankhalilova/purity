const ProductColor = require('../models/ProductColor');

const getAllProductColors = async (req, res) => {
    try {
        const colors = await ProductColor.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: colors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getProductColorById = async (req, res) => {
    try {
        const color = await ProductColor.findById(req.params.id);
        if (!color) {
            return res.status(404).json({ success: false, message: 'Color not found' });
        }
        res.status(200).json({ success: true, data: color });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createProductColor = async (req, res) => {
    try {
        const color = new ProductColor(req.body);
        await color.save();
        res.status(201).json({ success: true, data: color });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateProductColor = async (req, res) => {
    try {
        const color = await ProductColor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!color) {
            return res.status(404).json({ success: false, message: 'Color not found' });
        }
        res.status(200).json({ success: true, data: color });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteProductColor = async (req, res) => {
    try {
        const color = await ProductColor.findByIdAndDelete(req.params.id);
        if (!color) {
            return res.status(404).json({ success: false, message: 'Color not found' });
        }
        res.status(200).json({ success: true, message: 'Color deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllProductColors,
    getProductColorById,
    createProductColor,
    updateProductColor,
    deleteProductColor
};