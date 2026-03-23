const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// Get all orders (admin)
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

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.error('Error in getOrderById:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get user's orders
const getUserOrders = async (req, res) => {
    try {
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

        // Calculate totals
        let subtotal = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ success: false, message: `Product not found: ${item.productId}` });
            }

            const price = item.discountedPrice || parseFloat(product.price.replace('$', ''));
            subtotal += price * item.quantity;

            orderItems.push({
                product: product._id,
                name: product.name,
                quantity: item.quantity,
                price: price,
                originalPrice: product.originalPrice ? parseFloat(product.originalPrice.replace('$', '')) : null,
                size: item.size,
                color: item.color,
                image: product.images?.[0],
                discountApplied: item.discountedPrice ? (parseFloat(product.price.replace('$', '')) - price) : 0
            });
        }

        // Calculate discount (if coupon applied)
        let discount = 0;
        // TODO: Apply coupon logic here

        const shippingCost = subtotal > 100 ? 0 : 10;
        const total = subtotal - discount + shippingCost;

        const order = new Order({
            user: userId,
            items: orderItems,
            subtotal,
            discount,
            shippingCost,
            total,
            shippingAddress,
            billingAddress: billingAddress || shippingAddress,
            paymentMethod,
            couponCode,
            notes
        });

        await order.save();

        // Update user's order count and total spent
        await User.findByIdAndUpdate(userId, {
            $inc: { orderCount: 1, totalSpent: total }
        });

        res.status(201).json({ success: true, data: order });
    } catch (error) {
        console.error('Error in createOrder:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { status, trackingNumber } = req.body;

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

// Cancel order
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        if (order.status !== 'paid' && order.status !== 'getting_ready') {
            return res.status(400).json({ success: false, message: 'Order cannot be cancelled at this stage' });
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