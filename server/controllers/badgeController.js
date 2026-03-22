const Badge = require('../models/Badge');

const getAllBadges = async (req, res) => {
    try {
        const badges = await Badge.find();
        res.status(200).json({ success: true, data: badges });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getBadgeById = async (req, res) => {
    try {
        const badge = await Badge.findById(req.params.id);
        if (!badge) {
            return res.status(404).json({ success: false, message: 'Badge not found' });
        }
        res.status(200).json({ success: true, data: badge });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createBadge = async (req, res) => {
    try {
        const badge = new Badge(req.body);
        await badge.save();
        res.status(201).json({ success: true, data: badge });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateBadge = async (req, res) => {
    try {
        const badge = await Badge.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!badge) {
            return res.status(404).json({ success: false, message: 'Badge not found' });
        }
        res.status(200).json({ success: true, data: badge });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteBadge = async (req, res) => {
    try {
        const badge = await Badge.findByIdAndDelete(req.params.id);
        if (!badge) {
            return res.status(404).json({ success: false, message: 'Badge not found' });
        }
        res.status(200).json({ success: true, message: 'Badge deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllBadges,
    getBadgeById,
    createBadge,
    updateBadge,
    deleteBadge
};