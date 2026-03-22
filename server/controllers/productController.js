const Product = require('../models/Product');

// Get all products with pagination
const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const products = await Product.find()
            .populate('productColors')
            .populate('productSizes')
            .populate('skinColors')
            .populate('skinShades')
            .populate('skinTypes')
            .populate('skinConcerns')
            .populate('collection')
            .populate('tags')
            .populate('homeSections')
            .populate('pairsWell')
            .populate('boughtTogether')
            .populate('similarProducts')
            .populate('badges')
            .populate('reviews')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Product.countDocuments();

        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get product by MongoDB _id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('productColors')
            .populate('productSizes')
            .populate('skinColors')
            .populate('skinShades')
            .populate('skinTypes')
            .populate('skinConcerns')
            .populate('collection')
            .populate('tags')
            .populate('homeSections')
            .populate('pairsWell')
            .populate('boughtTogether')
            .populate('similarProducts')
            .populate('badges')
            .populate('reviews');

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new product
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();

        const populatedProduct = await Product.findById(product._id)
            .populate('productColors')
            .populate('productSizes')
            .populate('skinColors')
            .populate('skinShades')
            .populate('skinTypes')
            .populate('skinConcerns')
            .populate('collection')
            .populate('tags')
            .populate('homeSections');

        res.status(201).json({ success: true, data: populatedProduct });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
            .populate('productColors')
            .populate('productSizes')
            .populate('skinColors')
            .populate('skinShades')
            .populate('skinTypes')
            .populate('skinConcerns')
            .populate('collection')
            .populate('tags')
            .populate('homeSections');

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};