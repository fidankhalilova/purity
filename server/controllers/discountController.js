const Discount = require('../models/Discount');

const getAllDiscounts = async (req, res) => {
    try {
        const discounts = await Discount.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: discounts });
    } catch (error) {
        console.error('Error in getAllDiscounts:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getDiscountById = async (req, res) => {
    try {
        const discount = await Discount.findById(req.params.id);
        if (!discount) {
            return res.status(404).json({ success: false, message: 'Discount not found' });
        }
        res.status(200).json({ success: true, data: discount });
    } catch (error) {
        console.error('Error in getDiscountById:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getDiscountByCode = async (req, res) => {
    try {
        const discount = await Discount.findOne({
            code: req.params.code.toUpperCase(),
            status: 'active'
        });

        if (!discount) {
            return res.status(404).json({ success: false, message: 'Discount code not found or inactive' });
        }

        if (new Date() > new Date(discount.expires)) {
            return res.status(400).json({ success: false, message: 'Discount code has expired' });
        }

        if (discount.uses >= discount.maxUses) {
            return res.status(400).json({ success: false, message: 'Discount code has reached maximum uses' });
        }

        res.status(200).json({ success: true, data: discount });
    } catch (error) {
        console.error('Error in getDiscountByCode:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const createDiscount = async (req, res) => {
    try {
        const { code, type, value, maxUses, expires, status, product } = req.body;

        console.log('Creating discount with data:', { code, type, value, maxUses, expires, status, product });

        const existingDiscount = await Discount.findOne({ code: code.toUpperCase() });
        if (existingDiscount) {
            return res.status(400).json({
                success: false,
                message: 'Discount code already exists'
            });
        }

        const discount = new Discount({
            code: code.toUpperCase(),
            type,
            value: Number(value),
            maxUses: Number(maxUses),
            expires: new Date(expires),
            status: status || 'active',
            product: product || null
        });

        await discount.save();
        console.log('Discount created successfully:', discount._id);

        res.status(201).json({ success: true, data: discount });
    } catch (error) {
        console.error('Error in createDiscount:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateDiscount = async (req, res) => {
    try {
        const { code, type, value, maxUses, expires, status, product } = req.body;

        const discount = await Discount.findById(req.params.id);
        if (!discount) {
            return res.status(404).json({ success: false, message: 'Discount not found' });
        }

        if (code && code.toUpperCase() !== discount.code) {
            const existingDiscount = await Discount.findOne({ code: code.toUpperCase() });
            if (existingDiscount) {
                return res.status(400).json({ success: false, message: 'Discount code already exists' });
            }
        }

        const updatedDiscount = await Discount.findByIdAndUpdate(
            req.params.id,
            {
                code: code ? code.toUpperCase() : discount.code,
                type: type || discount.type,
                value: value !== undefined ? Number(value) : discount.value,
                maxUses: maxUses !== undefined ? Number(maxUses) : discount.maxUses,
                expires: expires ? new Date(expires) : discount.expires,
                status: status || discount.status,
                product: product !== undefined ? product : discount.product
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: updatedDiscount });
    } catch (error) {
        console.error('Error in updateDiscount:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateDiscountStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['active', 'expired', 'disabled'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const discount = await Discount.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!discount) {
            return res.status(404).json({ success: false, message: 'Discount not found' });
        }

        res.status(200).json({ success: true, data: discount });
    } catch (error) {
        console.error('Error in updateDiscountStatus:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteDiscount = async (req, res) => {
    try {
        const discount = await Discount.findByIdAndDelete(req.params.id);
        if (!discount) {
            return res.status(404).json({ success: false, message: 'Discount not found' });
        }
        res.status(200).json({ success: true, message: 'Discount deleted successfully' });
    } catch (error) {
        console.error('Error in deleteDiscount:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllDiscounts,
    getDiscountById,
    getDiscountByCode,
    createDiscount,
    updateDiscount,
    updateDiscountStatus,
    deleteDiscount
};