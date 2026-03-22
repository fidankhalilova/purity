const Collection = require('../models/Collection');

const getAllCollections = async (req, res) => {
    try {
        const collections = await Collection.find();
        res.status(200).json({ success: true, data: collections });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getCollectionById = async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(404).json({ success: false, message: 'Collection not found' });
        }
        res.status(200).json({ success: true, data: collection });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createCollection = async (req, res) => {
    try {
        const collection = new Collection(req.body);
        await collection.save();
        res.status(201).json({ success: true, data: collection });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateCollection = async (req, res) => {
    try {
        const collection = await Collection.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!collection) {
            return res.status(404).json({ success: false, message: 'Collection not found' });
        }
        res.status(200).json({ success: true, data: collection });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteCollection = async (req, res) => {
    try {
        const collection = await Collection.findByIdAndDelete(req.params.id);
        if (!collection) {
            return res.status(404).json({ success: false, message: 'Collection not found' });
        }
        res.status(200).json({ success: true, message: 'Collection deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllCollections,
    getCollectionById,
    createCollection,
    updateCollection,
    deleteCollection
};