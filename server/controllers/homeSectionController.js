const HomeSection = require('../models/HomeSection');

const getAllHomeSections = async (req, res) => {
    try {
        const sections = await HomeSection.find().sort({ order: 1 });
        res.status(200).json({ success: true, data: sections });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getHomeSectionById = async (req, res) => {
    try {
        const section = await HomeSection.findById(req.params.id);
        if (!section) {
            return res.status(404).json({ success: false, message: 'Section not found' });
        }
        res.status(200).json({ success: true, data: section });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createHomeSection = async (req, res) => {
    try {
        const section = new HomeSection(req.body);
        await section.save();
        res.status(201).json({ success: true, data: section });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateHomeSection = async (req, res) => {
    try {
        const section = await HomeSection.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!section) {
            return res.status(404).json({ success: false, message: 'Section not found' });
        }
        res.status(200).json({ success: true, data: section });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteHomeSection = async (req, res) => {
    try {
        const section = await HomeSection.findByIdAndDelete(req.params.id);
        if (!section) {
            return res.status(404).json({ success: false, message: 'Section not found' });
        }
        res.status(200).json({ success: true, message: 'Section deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllHomeSections,
    getHomeSectionById,
    createHomeSection,
    updateHomeSection,
    deleteHomeSection
};