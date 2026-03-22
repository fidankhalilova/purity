const Tag = require('../models/Tag');

const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json({ success: true, data: tags });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getTagById = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);
        if (!tag) {
            return res.status(404).json({ success: false, message: 'Tag not found' });
        }
        res.status(200).json({ success: true, data: tag });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createTag = async (req, res) => {
    try {
        const tag = new Tag(req.body);
        await tag.save();
        res.status(201).json({ success: true, data: tag });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateTag = async (req, res) => {
    try {
        const tag = await Tag.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!tag) {
            return res.status(404).json({ success: false, message: 'Tag not found' });
        }
        res.status(200).json({ success: true, data: tag });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findByIdAndDelete(req.params.id);
        if (!tag) {
            return res.status(404).json({ success: false, message: 'Tag not found' });
        }
        res.status(200).json({ success: true, message: 'Tag deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag
};