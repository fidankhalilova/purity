const Brand = require('../models/Brand');
const Product = require('../models/Product');

const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find().sort({ createdAt: -1 });

        const brandsWithCount = await Promise.all(
            brands.map(async (brand) => {
                const productCount = await Product.countDocuments({ brand: brand._id });
                return {
                    ...brand.toObject(),
                    productCount
                };
            })
        );

        res.status(200).json({ success: true, data: brandsWithCount });
    } catch (error) {
        console.error('Error in getAllBrands:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ success: false, message: 'Brand not found' });
        }

        const productCount = await Product.countDocuments({ brand: brand._id });
        const brandData = brand.toObject();
        brandData.productCount = productCount;

        res.status(200).json({ success: true, data: brandData });
    } catch (error) {
        console.error('Error in getBrandById:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const createBrand = async (req, res) => {
    try {
        const { name, country, logo, website, description, isFeatured, isActive } = req.body;

        const existingBrand = await Brand.findOne({ name });
        if (existingBrand) {
            return res.status(400).json({ success: false, message: 'Brand already exists' });
        }

        const brand = new Brand({
            name,
            country,
            logo,
            website: website || '',
            description,
            isFeatured: isFeatured || false,
            isActive: isActive !== undefined ? isActive : true
        });

        await brand.save();
        res.status(201).json({ success: true, data: brand });
    } catch (error) {
        console.error('Error in createBrand:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateBrand = async (req, res) => {
    try {
        const { name, country, logo, website, description, isFeatured, isActive } = req.body;

        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ success: false, message: 'Brand not found' });
        }

        if (name && name !== brand.name) {
            const existingBrand = await Brand.findOne({ name });
            if (existingBrand) {
                return res.status(400).json({ success: false, message: 'Brand name already exists' });
            }
        }

        const updatedBrand = await Brand.findByIdAndUpdate(
            req.params.id,
            {
                name: name || brand.name,
                country: country || brand.country,
                logo: logo || brand.logo,
                website: website !== undefined ? website : brand.website,
                description: description || brand.description,
                isFeatured: isFeatured !== undefined ? isFeatured : brand.isFeatured,
                isActive: isActive !== undefined ? isActive : brand.isActive
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: updatedBrand });
    } catch (error) {
        console.error('Error in updateBrand:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const toggleFeatured = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ success: false, message: 'Brand not found' });
        }

        brand.isFeatured = !brand.isFeatured;
        await brand.save();

        res.status(200).json({ success: true, data: brand });
    } catch (error) {
        console.error('Error in toggleFeatured:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const toggleActive = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ success: false, message: 'Brand not found' });
        }

        brand.isActive = !brand.isActive;
        await brand.save();

        res.status(200).json({ success: true, data: brand });
    } catch (error) {
        console.error('Error in toggleActive:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteBrand = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ success: false, message: 'Brand not found' });
        }

        const productCount = await Product.countDocuments({ brand: brand._id });
        if (productCount > 0) {
            return res.status(400).json({
                success: false,
                message: `Cannot delete brand. It has ${productCount} products associated.`
            });
        }

        await Brand.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Brand deleted successfully' });
    } catch (error) {
        console.error('Error in deleteBrand:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getProductsByBrand = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            return res.status(404).json({ success: false, message: 'Brand not found' });
        }

        const products = await Product.find({ brand: brand._id })
            .populate('productColors')
            .populate('productSizes')
            .populate('tags')
            .limit(20);

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error('Error in getProductsByBrand:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    toggleFeatured,
    toggleActive,
    deleteBrand,
    getProductsByBrand
};