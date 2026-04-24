const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../services/emailService');

router.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        console.log('Received contact form submission:', { name, email, subject });

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address'
            });
        }

        // Send email
        const emailSent = await sendContactEmail(name, email, subject, message);

        if (emailSent) {
            res.status(200).json({
                success: true,
                message: 'Message sent successfully'
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to send email'
            });
        }
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;