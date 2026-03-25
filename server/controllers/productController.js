// controllers/productController.js
const mongoose = require('mongoose'); // MUST be at the top
const Product = require('../models/Product');

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Build filter query
        let filter = {};

        // Search by name
        if (req.query.search) {
            filter.name = { $regex: req.query.search, $options: 'i' };
        }

        // Filter by collection (ObjectId)
        if (req.query.collection) {
            filter.collection = req.query.collection;
        }

        // Filter by tag (ObjectId)
        if (req.query.tag) {
            filter.tags = req.query.tag;
        }

        // Filter by stock status
        if (req.query.inStock !== undefined) {
            filter.inStock = req.query.inStock === 'true';
        }

        // Filter by status
        if (req.query.status) {
            filter.status = req.query.status;
        }

        // Filter by price range - FIX: price is stored as string like "$85.00"
        if (req.query.priceMin || req.query.priceMax) {
            filter.price = {};
            if (req.query.priceMin) {
                // Convert price string to number for comparison
                filter.price.$gte = `$${parseFloat(req.query.priceMin).toFixed(2)}`;
            }
            if (req.query.priceMax) {
                filter.price.$lte = `$${parseFloat(req.query.priceMax).toFixed(2)}`;
            }
        }

        // Build sort
        let sort = {};
        if (req.query.sort) {
            const sortOrder = req.query.order === 'desc' ? -1 : 1;
            if (req.query.sort === 'price') {
                sort = { priceValue: sortOrder };
            } else {
                sort[req.query.sort] = sortOrder;
            }
        } else {
            sort = { createdAt: -1 };
        }

        // Get populate fields
        const populateFields = req.query.populate ? req.query.populate.split(',') : [];

        // Execute query with population
        let query = Product.find(filter);

        // Apply populate
        populateFields.forEach(field => {
            if (field.trim()) {
                query = query.populate(field.trim());
            }
        });

        let products = await query;

        // Apply array filters after population
        let filteredProducts = products;

        // Filter by colors (productColors names)
        if (req.query.colors) {
            const colorNames = req.query.colors.split(',');
            filteredProducts = filteredProducts.filter(product => {
                if (!product.productColors || !Array.isArray(product.productColors)) return false;
                return product.productColors.some(color =>
                    colorNames.includes(color.name)
                );
            });
        }

        // Filter by sizes (productSizes size)
        if (req.query.sizes) {
            const sizeLabels = req.query.sizes.split(',');
            filteredProducts = filteredProducts.filter(product => {
                if (!product.productSizes || !Array.isArray(product.productSizes)) return false;
                return product.productSizes.some(size =>
                    sizeLabels.includes(size.size)
                );
            });
        }

        // Filter by brands (brand name)
        if (req.query.brands) {
            const brandNames = req.query.brands.split(',');
            filteredProducts = filteredProducts.filter(product => {
                if (!product.brand) return false;
                const brandName = typeof product.brand === 'object' ? product.brand.name : '';
                return brandNames.includes(brandName);
            });
        }

        // Filter by categories (collection name)
        if (req.query.categories) {
            const categoryNames = req.query.categories.split(',');
            filteredProducts = filteredProducts.filter(product => {
                if (!product.collection) return false;
                const collectionName = typeof product.collection === 'object' ? product.collection.name : '';
                return categoryNames.includes(collectionName);
            });
        }

        // Filter by concerns (skinConcerns names)
        if (req.query.concerns) {
            const concernNames = req.query.concerns.split(',');
            filteredProducts = filteredProducts.filter(product => {
                if (!product.skinConcerns || !Array.isArray(product.skinConcerns)) return false;
                return product.skinConcerns.some(concern => {
                    const concernName = typeof concern === 'object' ? concern.name : '';
                    return concernNames.includes(concernName);
                });
            });
        }

        // Filter by formulations (formulation name)
        if (req.query.formulations) {
            const formulationNames = req.query.formulations.split(',');
            filteredProducts = filteredProducts.filter(product => {
                if (!product.formulation) return false;
                const formulationName = typeof product.formulation === 'object' ? product.formulation.name : '';
                return formulationNames.includes(formulationName);
            });
        }

        // Filter by sale (products with originalPrice)
        if (req.query.onSale === 'true') {
            filteredProducts = filteredProducts.filter(product =>
                product.originalPrice && product.originalPrice !== ''
            );
        }

        // Filter by new arrivals (products created in last 30 days)
        if (req.query.newArrivals === 'true') {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            filteredProducts = filteredProducts.filter(product =>
                new Date(product.createdAt) >= thirtyDaysAgo
            );
        }

        // Apply pagination after filtering
        const total = filteredProducts.length;
        const paginatedProducts = filteredProducts.slice(skip, skip + limit);

        // FIX: Ensure inStock has a default value for all products
        const productsWithDefaultStock = paginatedProducts.map(product => {
            const productObj = product.toObject ? product.toObject() : product;
            // Set default inStock to true if undefined or null
            if (productObj.inStock === undefined || productObj.inStock === null) {
                productObj.inStock = true;
            }
            return productObj;
        });

        res.status(200).json({
            success: true,
            data: productsWithDefaultStock,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error in getAllProducts:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add a helper to add priceValue for sorting
const addPriceValue = async (products) => {
    return products.map(product => {
        const priceNum = parseFloat(product.price.replace('$', ''));
        return {
            ...product.toObject(),
            priceValue: priceNum
        };
    });
};

// Get product by ID or slug
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        let product;

        // Check if it's a valid ObjectId
        const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

        if (isValidObjectId) {
            product = await Product.findById(id)
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
                .populate('brand')
                .populate('formulation');
        }

        // If not found by ID or not a valid ObjectId, try by custom id field
        if (!product) {
            product = await Product.findOne({ id: id })
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
                .populate('brand')
                .populate('formulation');
        }

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error('Error in getProductById:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get product by slug
const getProductBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const product = await Product.findOne({ id: slug })
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
            .populate('brand')
            .populate('formulation');

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error('Error in getProductBySlug:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create product
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        console.error('Error in createProduct:', error);
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
        );
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error('Error in updateProduct:', error);
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
        console.error('Error in deleteProduct:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct
};