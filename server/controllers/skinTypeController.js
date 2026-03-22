const SkinType = require('../models/SkinType');

const getAllSkinTypes = async (req, res) => {
    try {
        const skinTypes = await SkinType.find().populate('skinConcerns');
        res.status(200).json({ success: true, data: skinTypes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getSkinTypeById = async (req, res) => {
    try {
        const skinType = await SkinType.findById(req.params.id).populate('skinConcerns');
        if (!skinType) {
            return res.status(404).json({ success: false, message: 'Skin type not found' });
        }
        res.status(200).json({ success: true, data: skinType });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createSkinType = async (req, res) => {
    try {
        const skinType = new SkinType(req.body);
        await skinType.save();
        res.status(201).json({ success: true, data: skinType });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateSkinType = async (req, res) => {
    try {
        const skinType = await SkinType.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!skinType) {
            return res.status(404).json({ success: false, message: 'Skin type not found' });
        }
        res.status(200).json({ success: true, data: skinType });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteSkinType = async (req, res) => {
    try {
        const skinType = await SkinType.findByIdAndDelete(req.params.id);
        if (!skinType) {
            return res.status(404).json({ success: false, message: 'Skin type not found' });
        }
        res.status(200).json({ success: true, message: 'Skin type deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllSkinTypes,
    getSkinTypeById,
    createSkinType,
    updateSkinType,
    deleteSkinType
};