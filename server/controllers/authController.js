// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('../services/emailService');

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
            password,
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

        // Find user with password field
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check if user is blocked
        if (user.status === 'blocked') {
            console.log('User blocked:', email);
            return res.status(403).json({
                success: false,
                message: 'Account has been blocked. Please contact support.'
            });
        }

        // Verify password
        const isMatch = await user.comparePassword(password);
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

const googleLogin = passport.authenticate('google', {
    scope: ['profile', 'email']
});

// controllers/authController.js - Update googleCallback
const googleCallback = (req, res, next) => {
    // Use passport.authenticate as middleware with session: false
    passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/en/account/login?error=google_auth_failed` },
        async (err, user, info) => {
            try {
                console.log('Google Callback - Error:', err);
                console.log('Google Callback - User:', user);
                console.log('Google Callback - Info:', info);

                if (err || !user) {
                    console.error('Google auth failed:', err || 'No user returned');
                    return res.redirect(`${process.env.FRONTEND_URL}/en/account/login?error=google_auth_failed`);
                }

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

                // Redirect to frontend with user data
                const redirectUrl = `${process.env.FRONTEND_URL}/en/account/google/callback?token=${accessToken}&user=${encodeURIComponent(JSON.stringify(userData))}`;
                console.log('Redirecting to:', redirectUrl);
                res.redirect(redirectUrl);
            } catch (error) {
                console.error('Google callback error:', error);
                res.redirect(`${process.env.FRONTEND_URL}/en/account/login?error=google_auth_failed`);
            }
        })(req, res, next);
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

        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-key-change-in-production');
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired refresh token'
            });
        }

        const user = await User.findOne({
            _id: decoded.userId,
            refreshToken: refreshToken
        }).select('+refreshToken');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid refresh token'
            });
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);
        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        });

        res.status(200).json({
            success: true,
            data: { accessToken }
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
            await User.findOneAndUpdate(
                { refreshToken },
                { $unset: { refreshToken: 1 } }
            );
        }

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });

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
        const user = await User.findById(req.userId)
            .select('-password -resetPasswordToken -resetPasswordExpire -verificationToken -refreshToken')
            .populate('wishlist', 'name price images rating');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error in getCurrentUser:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        const user = await User.findOne({ email });

        // For security, don't reveal if user exists or not
        if (!user) {
            return res.status(200).json({
                success: true,
                message: 'If an account exists with this email, you will receive a password reset link.'
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpire = Date.now() + 3600000; // 1 hour

        // Save token to user
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = resetTokenExpire;
        await user.save();

        // Send email
        const emailSent = await sendPasswordResetEmail(email, resetToken, user.name);

        if (!emailSent) {
            // If email fails, clear the token
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            return res.status(500).json({
                success: false,
                message: 'Failed to send reset email. Please try again later.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'If an account exists with this email, you will receive a password reset link.'
        });
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process request'
        });
    }
};

// Reset password with token
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Token and new password are required'
            });
        }

        // Find user with valid token
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        // Update password
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password reset successfully. You can now login with your new password.'
        });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to reset password'
        });
    }
};

// Verify reset token
const verifyResetToken = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Token is valid'
        });
    } catch (error) {
        console.error('Error in verifyResetToken:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to verify token'
        });
    }
};


module.exports = {
    register,
    login,
    googleLogin,
    googleCallback,
    refreshToken,
    logout,
    getCurrentUser,
    forgotPassword,
    resetPassword,
    verifyResetToken
};