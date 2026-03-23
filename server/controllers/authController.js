// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateTokens = (userId) => {
    const accessToken = jwt.sign(
        { userId },
        process.env.JWT_SECRET || 'fallback-secret-key-change-in-production',
        { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-key-change-in-production',
        { expiresIn: '7d' }
    );
    return { accessToken, refreshToken };
};

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const name = `${firstName} ${lastName}`.trim();
        console.log('Registration attempt:', { name, email });

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Create user
        const user = new User({
            name,
            email,
            password, // Will be hashed by pre-save hook
            role: 'customer',
            status: 'active',
            emailVerified: true
        });

        await user.save();
        console.log('User created:', user._id);

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user._id);

        // Store refresh token in database
        user.refreshToken = refreshToken;
        await user.save();

        const userData = user.toObject();
        delete userData.password;
        delete userData.refreshToken;

        // Set refresh token as HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        });

        res.status(201).json({
            success: true,
            data: {
                user: userData,
                accessToken
            }
        });
    } catch (error) {
        console.error('Error in register:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        console.log('Login attempt:', { email });

        // Find user with password field (explicitly include password since it's normally excluded)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        console.log('User found:', {
            id: user._id,
            email: user.email,
            hasPassword: !!user.password,
            passwordLength: user.password?.length
        });

        // Check if user is blocked
        if (user.status === 'blocked') {
            console.log('User blocked:', email);
            return res.status(403).json({
                success: false,
                message: 'Account has been blocked. Please contact support.'
            });
        }

        // Verify password - using comparePassword method
        let isMatch = false;
        try {
            isMatch = await user.comparePassword(password);
            console.log('Password match result:', isMatch);
        } catch (compareError) {
            console.error('Error comparing password:', compareError);
            isMatch = false;
        }

        if (!isMatch) {
            console.log('Invalid password for:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user._id);

        // Store refresh token in database
        user.refreshToken = refreshToken;
        await user.save();

        const userData = user.toObject();
        delete userData.password;
        delete userData.refreshToken;

        // Set refresh token as HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        });

        console.log('Login successful:', user._id);

        res.status(200).json({
            success: true,
            data: {
                user: userData,
                accessToken
            }
        });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: 'No refresh token provided'
            });
        }

        console.log('Refresh token attempt');

        // Verify refresh token
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-key-change-in-production');
        } catch (error) {
            console.error('Refresh token verification failed:', error.message);
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired refresh token'
            });
        }

        // Find user with this refresh token
        const user = await User.findOne({
            _id: decoded.userId,
            refreshToken: refreshToken
        }).select('+refreshToken');

        if (!user) {
            console.log('User not found for refresh token');
            return res.status(401).json({
                success: false,
                message: 'Invalid refresh token'
            });
        }

        // Generate new tokens
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);

        // Update refresh token in database
        user.refreshToken = newRefreshToken;
        await user.save();

        // Set new refresh token as cookie
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        });

        console.log('Refresh token successful for user:', user._id);

        res.status(200).json({
            success: true,
            data: {
                accessToken
            }
        });
    } catch (error) {
        console.error('Error in refreshToken:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (refreshToken) {
            console.log('Logout attempt, clearing refresh token');
            // Remove refresh token from database
            await User.findOneAndUpdate(
                { refreshToken },
                { $unset: { refreshToken: 1 } }
            );
        }

        // Clear refresh token cookie
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });

        console.log('Logout successful');

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Error in logout:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        console.log('Get current user, userId:', req.userId);

        const user = await User.findById(req.userId)
            .select('-password -resetPasswordToken -resetPasswordExpire -verificationToken -refreshToken')
            .populate('wishlist', 'name price images rating');

        if (!user) {
            console.log('User not found:', req.userId);
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        console.log('Current user found:', user.email);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error in getCurrentUser:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    register,
    login,
    refreshToken,
    logout,
    getCurrentUser
};