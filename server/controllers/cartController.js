// controllers/cartController.js
const User = require('../models/User');
const Product = require('../models/Product');

// Get user's cart
const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .populate('cart.productId', 'name price originalPrice images inStock');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Format cart items for frontend
        const cartItems = user.cart.map(item => ({
            id: item._id,
            productId: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            originalPrice: item.productId.originalPrice,
            image: item.productId.images?.[0] || '',
            qty: item.quantity,
            size: item.size,
            color: item.color,
            inStock: item.productId.inStock
        }));

        console.log('Returning cart items:', cartItems.length);
        res.status(200).json({ success: true, data: cartItems });
    } catch (error) {
        console.error('Error in getCart:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add to cart
const addToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity, size, color } = req.body;

        console.log('Adding to cart:', { userId, productId, quantity, size, color });

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Check if same variant already exists in cart
        const existingItemIndex = user.cart.findIndex(item => {
            const sameProduct = item.productId.toString() === productId;
            const sameSize = item.size === size;
            const sameColor = item.color === color;
            return sameProduct && sameSize && sameColor;
        });

        if (existingItemIndex !== -1) {
            // Update quantity
            user.cart[existingItemIndex].quantity += quantity;
            console.log('Updated existing item quantity:', user.cart[existingItemIndex].quantity);
        } else {
            // Add new item
            user.cart.push({
                productId,
                quantity,
                size: size || null,
                color: color || null
            });
            console.log('Added new item to cart');
        }

        await user.save();

        // Populate and return updated cart
        const updatedUser = await User.findById(userId)
            .populate('cart.productId', 'name price originalPrice images inStock');

        const cartItems = updatedUser.cart.map(item => ({
            id: item._id,
            productId: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            originalPrice: item.productId.originalPrice,
            image: item.productId.images?.[0] || '',
            qty: item.quantity,
            size: item.size,
            color: item.color,
            inStock: item.productId.inStock
        }));

        console.log('Cart updated, total items:', cartItems.length);
        res.status(200).json({ success: true, data: cartItems });
    } catch (error) {
        console.error('Error in addToCart:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        const { quantity } = req.body;

        console.log('Updating cart item:', { userId, itemId, quantity });

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const cartItem = user.cart.id(itemId);
        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Cart item not found' });
        }

        if (quantity <= 0) {
            cartItem.remove();
            console.log('Removed cart item');
        } else {
            cartItem.quantity = quantity;
            console.log('Updated cart item quantity:', quantity);
        }

        await user.save();

        // Populate and return updated cart
        const updatedUser = await User.findById(userId)
            .populate('cart.productId', 'name price originalPrice images inStock');

        const cartItems = updatedUser.cart.map(item => ({
            id: item._id,
            productId: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            originalPrice: item.productId.originalPrice,
            image: item.productId.images?.[0] || '',
            qty: item.quantity,
            size: item.size,
            color: item.color,
            inStock: item.productId.inStock
        }));

        res.status(200).json({ success: true, data: cartItems });
    } catch (error) {
        console.error('Error in updateCartItem:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Remove cart item
const removeCartItem = async (req, res) => {
    try {
        const { userId, itemId } = req.params;

        console.log('Removing cart item:', { userId, itemId });

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.cart = user.cart.filter(item => item._id.toString() !== itemId);
        await user.save();

        // Populate and return updated cart
        const updatedUser = await User.findById(userId)
            .populate('cart.productId', 'name price originalPrice images inStock');

        const cartItems = updatedUser.cart.map(item => ({
            id: item._id,
            productId: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            originalPrice: item.productId.originalPrice,
            image: item.productId.images?.[0] || '',
            qty: item.quantity,
            size: item.size,
            color: item.color,
            inStock: item.productId.inStock
        }));

        res.status(200).json({ success: true, data: cartItems });
    } catch (error) {
        console.error('Error in removeCartItem:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem
};