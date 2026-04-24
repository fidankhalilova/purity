const mongoose = require('mongoose');
const Collection = require('../models/Collection');
const Product = require('../models/Product');

const getAllCollections = async (req, res) => {
    try {
        const collections = await Collection.find().sort({ order: 1, name: 1 });

        const collectionsWithCounts = await Promise.all(
            collections.map(async (collection) => {
                const productCount = await Product.countDocuments({
                    collection: collection._id,
                    status: 'active'
                });
                return {
                    ...collection.toObject(),
                    productCount
                };
            })
        );

        res.status(200).json({ success: true, data: collectionsWithCounts });
    } catch (error) {
        console.error('Error in getAllCollections:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getCollectionById = async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(404).json({ success: false, message: 'Collection not found' });
        }

        const productCount = await Product.countDocuments({ collection: collection._id });
        const collectionData = collection.toObject();
        collectionData.productCount = productCount;

        res.status(200).json({ success: true, data: collectionData });
    } catch (error) {
        console.error('Error in getCollectionById:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const createCollection = async (req, res) => {
    try {
        const { name, description, image, isActive } = req.body;

        const collection = new Collection({
            name,
            description,
            image,
            isActive: isActive !== undefined ? isActive : true
        });

        await collection.save();
        res.status(201).json({ success: true, data: collection });
    } catch (error) {
        console.error('Error in createCollection:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateCollection = async (req, res) => {
    try {
        const { name, description, image, isActive } = req.body;

        const collection = await Collection.findByIdAndUpdate(
            req.params.id,
            { name, description, image, isActive },
            { new: true, runValidators: true }
        );

        if (!collection) {
            return res.status(404).json({ success: false, message: 'Collection not found' });
        }

        res.status(200).json({ success: true, data: collection });
    } catch (error) {
        console.error('Error in updateCollection:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteCollection = async (req, res) => {
    try {
        const collection = await Collection.findByIdAndDelete(req.params.id);

        if (!collection) {
            return res.status(404).json({ success: false, message: 'Collection not found' });
        }

        await Product.updateMany(
            { collection: collection._id },
            { $set: { collection: null } }
        );

        res.status(200).json({ success: true, message: 'Collection deleted successfully' });
    } catch (error) {
        console.error('Error in deleteCollection:', error);
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