const SkinConcern = require('../models/SkinConcern');

const getAllSkinConcerns = async (req, res) => {
    try {
        const concerns = await SkinConcern.find().populate('skinType');
        res.status(200).json({ success: true, data: concerns });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getSkinConcernById = async (req, res) => {
    try {
        const concern = await SkinConcern.findById(req.params.id).populate('skinType');
        if (!concern) {
            return res.status(404).json({ success: false, message: 'Skin concern not found' });
        }
        res.status(200).json({ success: true, data: concern });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createSkinConcern = async (req, res) => {
    try {
        const concern = new SkinConcern(req.body);
        await concern.save();
        res.status(201).json({ success: true, data: concern });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateSkinConcern = async (req, res) => {
    try {
        const concern = await SkinConcern.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!concern) {
            return res.status(404).json({ success: false, message: 'Skin concern not found' });
        }
        res.status(200).json({ success: true, data: concern });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteSkinConcern = async (req, res) => {
    try {
        const concern = await SkinConcern.findByIdAndDelete(req.params.id);
        if (!concern) {
            return res.status(404).json({ success: false, message: 'Skin concern not found' });
        }
        res.status(200).json({ success: true, message: 'Skin concern deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllSkinConcerns,
    getSkinConcernById,
    createSkinConcern,
    updateSkinConcern,
    deleteSkinConcern
};