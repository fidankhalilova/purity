const SkinShade = require('../models/SkinShade');

const getAllSkinShades = async (req, res) => {
    try {
        const shades = await SkinShade.find();
        res.status(200).json({ success: true, data: shades });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getSkinShadeById = async (req, res) => {
    try {
        const shade = await SkinShade.findById(req.params.id);
        if (!shade) {
            return res.status(404).json({ success: false, message: 'Skin shade not found' });
        }
        res.status(200).json({ success: true, data: shade });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createSkinShade = async (req, res) => {
    try {
        const shade = new SkinShade(req.body);
        await shade.save();
        res.status(201).json({ success: true, data: shade });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateSkinShade = async (req, res) => {
    try {
        const shade = await SkinShade.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!shade) {
            return res.status(404).json({ success: false, message: 'Skin shade not found' });
        }
        res.status(200).json({ success: true, data: shade });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteSkinShade = async (req, res) => {
    try {
        const shade = await SkinShade.findByIdAndDelete(req.params.id);
        if (!shade) {
            return res.status(404).json({ success: false, message: 'Skin shade not found' });
        }
        res.status(200).json({ success: true, message: 'Skin shade deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllSkinShades,
    getSkinShadeById,
    createSkinShade,
    updateSkinShade,
    deleteSkinShade
};