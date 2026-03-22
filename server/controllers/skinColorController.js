const SkinColor = require('../models/SkinColor');

const getAllSkinColors = async (req, res) => {
    try {
        const colors = await SkinColor.find();
        res.status(200).json({ success: true, data: colors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getSkinColorById = async (req, res) => {
    try {
        const color = await SkinColor.findById(req.params.id);
        if (!color) {
            return res.status(404).json({ success: false, message: 'Skin color not found' });
        }
        res.status(200).json({ success: true, data: color });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createSkinColor = async (req, res) => {
    try {
        const color = new SkinColor(req.body);
        await color.save();
        res.status(201).json({ success: true, data: color });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateSkinColor = async (req, res) => {
    try {
        const color = await SkinColor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!color) {
            return res.status(404).json({ success: false, message: 'Skin color not found' });
        }
        res.status(200).json({ success: true, data: color });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteSkinColor = async (req, res) => {
    try {
        const color = await SkinColor.findByIdAndDelete(req.params.id);
        if (!color) {
            return res.status(404).json({ success: false, message: 'Skin color not found' });
        }
        res.status(200).json({ success: true, message: 'Skin color deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllSkinColors,
    getSkinColorById,
    createSkinColor,
    updateSkinColor,
    deleteSkinColor
};