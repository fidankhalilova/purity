const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
            scope: ['profile', 'email']
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log('Google profile:', {
                    id: profile.id,
                    email: profile.emails?.[0]?.value,
                    name: profile.displayName,
                    photo: profile.photos?.[0]?.value
                });

                // Check if user exists by Google ID
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    // Update last login
                    user.lastLogin = new Date();
                    await user.save();
                    return done(null, user);
                }

                // Check if user exists by email
                const email = profile.emails?.[0]?.value;
                if (email) {
                    user = await User.findOne({ email });

                    if (user) {
                        // Link Google account to existing user
                        user.googleId = profile.id;
                        user.avatar = profile.photos?.[0]?.value || user.avatar;
                        user.lastLogin = new Date();
                        await user.save();
                        return done(null, user);
                    }
                }

                // Create new user
                const newUser = new User({
                    name: profile.displayName,
                    email: profile.emails?.[0]?.value,
                    googleId: profile.id,
                    avatar: profile.photos?.[0]?.value || '',
                    role: 'customer',
                    status: 'active',
                    emailVerified: true,
                    lastLogin: new Date()
                });

                await newUser.save();
                console.log('New Google user created:', newUser._id);

                return done(null, newUser);
            } catch (error) {
                console.error('Google Strategy Error:', error);
                return done(error, null);
            }
        }
    )
);

module.exports = passport;