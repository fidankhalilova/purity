// controllers/glowIngredientController.js
const GlowIngredient = require('../models/GlowIngredient');

// Get all glow ingredients
const getAllGlowIngredients = async (req, res) => {
    try {
        const ingredients = await GlowIngredient.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: ingredients });
    } catch (error) {
        console.error('Error in getAllGlowIngredients:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get glow ingredient by ID
const getGlowIngredientById = async (req, res) => {
    try {
        const ingredient = await GlowIngredient.findById(req.params.id);
        if (!ingredient) {
            return res.status(404).json({ success: false, message: 'Glow ingredient not found' });
        }
        res.status(200).json({ success: true, data: ingredient });
    } catch (error) {
        console.error('Error in getGlowIngredientById:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create glow ingredient
const createGlowIngredient = async (req, res) => {
    try {
        const { tag, subtitle, title, description, image } = req.body;

        const ingredient = new GlowIngredient({
            tag,
            subtitle,
            title,
            description,
            image
        });

        await ingredient.save();
        res.status(201).json({ success: true, data: ingredient });
    } catch (error) {
        console.error('Error in createGlowIngredient:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update glow ingredient
const updateGlowIngredient = async (req, res) => {
    try {
        const { tag, subtitle, title, description, image } = req.body;

        const ingredient = await GlowIngredient.findByIdAndUpdate(
            req.params.id,
            { tag, subtitle, title, description, image },
            { new: true, runValidators: true }
        );

        if (!ingredient) {
            return res.status(404).json({ success: false, message: 'Glow ingredient not found' });
        }

        res.status(200).json({ success: true, data: ingredient });
    } catch (error) {
        console.error('Error in updateGlowIngredient:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete glow ingredient
const deleteGlowIngredient = async (req, res) => {
    try {
        const ingredient = await GlowIngredient.findByIdAndDelete(req.params.id);
        if (!ingredient) {
            return res.status(404).json({ success: false, message: 'Glow ingredient not found' });
        }
        res.status(200).json({ success: true, message: 'Glow ingredient deleted successfully' });
    } catch (error) {
        console.error('Error in deleteGlowIngredient:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllGlowIngredients,
    getGlowIngredientById,
    createGlowIngredient,
    updateGlowIngredient,
    deleteGlowIngredient
};