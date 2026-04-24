const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select('-password -resetPasswordToken -resetPasswordExpire -verificationToken -refreshToken')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password -resetPasswordToken -resetPasswordExpire -verificationToken')
            .populate('wishlist', 'name price images rating');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('Error in getUserById:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
const createUser = async (req, res) => {
    try {
        const { name, email, password, role, status } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        const user = new User({
            name,
            email,
            password,
            role: role || 'customer',
            status: status || 'active',
            emailVerified: true
        });

        await user.save();

        const userData = user.toObject();
        delete userData.password;

        res.status(201).json({ success: true, data: userData });
    } catch (error) {
        console.error('Error in createUser:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, email, phone, birthday, gender, role, status, notificationSettings, displayLanguage } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, birthday, gender, role, status, notificationSettings, displayLanguage },
            { new: true, runValidators: true }
        ).select('-password -resetPasswordToken -resetPasswordExpire -verificationToken');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('Error in updateUser:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateUserStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('Error in updateUserStatus:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const addAddress = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const newAddress = { ...req.body, isDefault: user.addresses.length === 0 ? true : req.body.isDefault };

        if (newAddress.isDefault) {
            user.addresses.forEach(addr => { addr.isDefault = false; });
        }

        user.addresses.push(newAddress);
        await user.save();

        res.status(201).json({ success: true, data: user.addresses });
    } catch (error) {
        console.error('Error in addAddress:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateAddress = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const address = user.addresses.id(req.params.addressId);
        if (!address) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }

        Object.assign(address, req.body);

        if (address.isDefault) {
            user.addresses.forEach(addr => {
                if (addr._id.toString() !== req.params.addressId) {
                    addr.isDefault = false;
                }
            });
        }

        await user.save();
        res.status(200).json({ success: true, data: user.addresses });
    } catch (error) {
        console.error('Error in updateAddress:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const address = user.addresses.id(req.params.addressId);
        if (!address) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }

        address.remove();
        await user.save();

        res.status(200).json({ success: true, data: user.addresses });
    } catch (error) {
        console.error('Error in deleteAddress:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const addToWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const productId = req.params.productId;

        if (user.wishlist.includes(productId)) {
            return res.status(400).json({ success: false, message: 'Product already in wishlist' });
        }

        user.wishlist.push(productId);
        await user.save();

        const updatedUser = await User.findById(user._id).populate('wishlist', 'name price images rating');

        res.status(200).json({ success: true, data: updatedUser.wishlist });
    } catch (error) {
        console.error('Error in addToWishlist:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
        await user.save();

        const updatedUser = await User.findById(user._id).populate('wishlist', 'name price images rating');

        res.status(200).json({ success: true, data: updatedUser.wishlist });
    } catch (error) {
        console.error('Error in removeFromWishlist:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateAvatar = async (req, res) => {
    try {
        console.log('=== updateAvatar called ===');
        console.log('Request params:', req.params);
        console.log('Request file:', req.file);

        if (!req.file) {
            console.log('No file in request');
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const filename = req.file.filename;
        console.log('Filename:', filename);

        const protocol = req.protocol;
        const host = req.get('host');
        const baseUrl = `${protocol}://${host}`;

        const fullAvatarUrl = `${baseUrl}/uploads/avatars/${filename}`;

        console.log('Full avatar URL:', fullAvatarUrl);

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { avatar: fullAvatarUrl },
            { new: true }
        ).select('-password -refreshToken');

        if (!user) {
            console.log('User not found:', req.params.id);
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        console.log('User updated with avatar:', user.avatar);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error in updateAvatar:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Current password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error in updatePassword:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error in deleteUser:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    updateUserStatus,
    addAddress,
    updateAddress,
    deleteAddress,
    addToWishlist,
    removeFromWishlist,
    updateAvatar,
    updatePassword,
    deleteUser
};