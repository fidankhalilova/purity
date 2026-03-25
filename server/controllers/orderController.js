// controllers/orderController.js
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// Get all orders (admin only)
const getAllOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = {};
        if (req.query.status) query.status = req.query.status;
        if (req.query.userId) query.user = req.query.userId;

        const orders = await Order.find(query)
            .populate('user', 'name email')
            .populate('items.product', 'name images')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Order.countDocuments(query);

        res.status(200).json({
            success: true,
            data: orders,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error in getAllOrders:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email phone')
            .populate('items.product', 'name images price');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Check if user is authorized (admin or order owner)
        if (req.userRole !== 'admin' && order.user._id.toString() !== req.userId) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.error('Error in getOrderById:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get user's orders
const getUserOrders = async (req, res) => {
    try {
        // Check if user is authorized (admin or requesting their own orders)
        if (req.userRole !== 'admin' && req.params.userId !== req.userId) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        const orders = await Order.find({ user: req.params.userId })
            .populate('items.product', 'name images')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error('Error in getUserOrders:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create order
const createOrder = async (req, res) => {
    try {
        const { userId, items, shippingAddress, billingAddress, paymentMethod, couponCode, notes } = req.body;

        console.log('=== Creating Order ===');
        console.log('User ID:', userId);
        console.log('Items count:', items?.length);

        // Check if user is authorized
        if (req.userId !== userId && req.userRole !== 'admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        // Validate required fields
        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: 'Items are required' });
        }

        if (!shippingAddress) {
            return res.status(400).json({ success: false, message: 'Shipping address is required' });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Calculate totals
        let subtotal = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product not found: ${item.productId}`
                });
            }

            // Get price
            let price = item.price;
            if (!price) {
                if (typeof product.price === 'string') {
                    price = parseFloat(product.price.replace('$', ''));
                } else {
                    price = product.price;
                }
            }

            const finalPrice = item.discountedPrice || price;
            subtotal += finalPrice * item.quantity;

            orderItems.push({
                product: product._id,
                name: product.name,
                quantity: item.quantity,
                price: finalPrice,
                originalPrice: product.originalPrice ? parseFloat(product.originalPrice.replace('$', '')) : null,
                size: item.size || null,
                color: item.color || null,
                image: product.images?.[0] || null,
                discountApplied: item.discountedPrice ? (price - finalPrice) : 0
            });
        }

        // Calculate shipping (free over $100)
        const shippingCost = subtotal > 100 ? 0 : 10;
        const discount = 0; // TODO: Apply coupon logic
        const total = subtotal - discount + shippingCost;

        // Generate order number
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const orderNumber = `ORD-${year}${month}${day}-${random}`;

        const order = new Order({
            orderNumber,
            user: userId,
            items: orderItems,
            subtotal,
            discount,
            shippingCost,
            total,
            shippingAddress,
            billingAddress: billingAddress || shippingAddress,
            paymentMethod,
            paymentStatus: 'pending',
            status: 'paid',
            couponCode: couponCode || null,
            notes: notes || null
        });

        await order.save();
        console.log('Order created successfully:', order.orderNumber);

        // Update user's order count and total spent
        await User.findByIdAndUpdate(userId, {
            $inc: { orderCount: 1, totalSpent: total }
        });

        // Clear user's cart after order
        await User.findByIdAndUpdate(userId, {
            $set: { cart: [] }
        });

        // Populate the order before sending response
        const populatedOrder = await Order.findById(order._id)
            .populate('items.product', 'name images');

        res.status(201).json({
            success: true,
            data: populatedOrder
        });
    } catch (error) {
        console.error('Error in createOrder:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to create order'
        });
    }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
    try {
        const { status, trackingNumber } = req.body;

        if (!['paid', 'getting_ready', 'shipped', 'delivered', 'cancelled'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const updateData = { status };
        if (trackingNumber) updateData.trackingNumber = trackingNumber;
        if (status === 'delivered') updateData.deliveredAt = new Date();
        if (status === 'cancelled') updateData.cancelledAt = new Date();

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.error('Error in updateOrderStatus:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Cancel order (user or admin)
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Check if user is authorized (admin or order owner)
        if (req.userRole !== 'admin' && order.user.toString() !== req.userId) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        // Check if order can be cancelled
        if (order.status !== 'paid' && order.status !== 'getting_ready') {
            return res.status(400).json({
                success: false,
                message: 'Order cannot be cancelled at this stage'
            });
        }

        order.status = 'cancelled';
        order.cancelledAt = new Date();
        await order.save();

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.error('Error in cancelOrder:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    getUserOrders,
    createOrder,
    updateOrderStatus,
    cancelOrder
};