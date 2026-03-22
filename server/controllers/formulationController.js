const Formulation = require('../models/Formulation');
const Product = require('../models/Product');

// Get all formulations
const getAllFormulations = async (req, res) => {
    try {
        const formulations = await Formulation.find().sort({ createdAt: -1 });

        // Get product count for each formulation
        const formulationsWithCount = await Promise.all(
            formulations.map(async (formulation) => {
                const productCount = await Product.countDocuments({ formulation: formulation._id });
                return {
                    ...formulation.toObject(),
                    productCount
                };
            })
        );

        res.status(200).json({ success: true, data: formulationsWithCount });
    } catch (error) {
        console.error('Error in getAllFormulations:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get formulation by ID
const getFormulationById = async (req, res) => {
    try {
        const formulation = await Formulation.findById(req.params.id);
        if (!formulation) {
            return res.status(404).json({ success: false, message: 'Formulation not found' });
        }

        const productCount = await Product.countDocuments({ formulation: formulation._id });
        const formulationData = formulation.toObject();
        formulationData.productCount = productCount;

        res.status(200).json({ success: true, data: formulationData });
    } catch (error) {
        console.error('Error in getFormulationById:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create formulation
const createFormulation = async (req, res) => {
    try {
        const { name, description, isActive } = req.body;

        // Check if formulation already exists
        const existingFormulation = await Formulation.findOne({ name });
        if (existingFormulation) {
            return res.status(400).json({ success: false, message: 'Formulation already exists' });
        }

        const formulation = new Formulation({
            name,
            description: description || '',
            isActive: isActive !== undefined ? isActive : true
        });

        await formulation.save();
        res.status(201).json({ success: true, data: formulation });
    } catch (error) {
        console.error('Error in createFormulation:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update formulation
const updateFormulation = async (req, res) => {
    try {
        const { name, description, isActive } = req.body;

        const formulation = await Formulation.findById(req.params.id);
        if (!formulation) {
            return res.status(404).json({ success: false, message: 'Formulation not found' });
        }

        // Check if name is being changed and already exists
        if (name && name !== formulation.name) {
            const existingFormulation = await Formulation.findOne({ name });
            if (existingFormulation) {
                return res.status(400).json({ success: false, message: 'Formulation name already exists' });
            }
        }

        const updatedFormulation = await Formulation.findByIdAndUpdate(
            req.params.id,
            {
                name: name || formulation.name,
                description: description !== undefined ? description : formulation.description,
                isActive: isActive !== undefined ? isActive : formulation.isActive
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: updatedFormulation });
    } catch (error) {
        console.error('Error in updateFormulation:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Toggle active status
const toggleActive = async (req, res) => {
    try {
        const formulation = await Formulation.findById(req.params.id);
        if (!formulation) {
            return res.status(404).json({ success: false, message: 'Formulation not found' });
        }

        formulation.isActive = !formulation.isActive;
        await formulation.save();

        res.status(200).json({ success: true, data: formulation });
    } catch (error) {
        console.error('Error in toggleActive:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete formulation
const deleteFormulation = async (req, res) => {
    try {
        const formulation = await Formulation.findById(req.params.id);
        if (!formulation) {
            return res.status(404).json({ success: false, message: 'Formulation not found' });
        }

        // Check if formulation has products
        const productCount = await Product.countDocuments({ formulation: formulation._id });
        if (productCount > 0) {
            return res.status(400).json({
                success: false,
                message: `Cannot delete formulation. It has ${productCount} products associated. Please reassign or delete the products first.`
            });
        }

        await Formulation.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Formulation deleted successfully' });
    } catch (error) {
        console.error('Error in deleteFormulation:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get products by formulation
const getProductsByFormulation = async (req, res) => {
    try {
        const formulation = await Formulation.findById(req.params.id);
        if (!formulation) {
            return res.status(404).json({ success: false, message: 'Formulation not found' });
        }

        const products = await Product.find({ formulation: formulation._id })
            .populate('productColors')
            .populate('productSizes')
            .populate('tags')
            .limit(20);

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error('Error in getProductsByFormulation:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllFormulations,
    getFormulationById,
    createFormulation,
    updateFormulation,
    toggleActive,
    deleteFormulation,
    getProductsByFormulation
};