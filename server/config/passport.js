const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

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

                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    user.lastLogin = new Date();
                    await user.save();
                    return done(null, user);
                }

                const email = profile.emails?.[0]?.value;
                if (email) {
                    user = await User.findOne({ email });

                    if (user) {
                        user.googleId = profile.id;
                        user.avatar = profile.photos?.[0]?.value || user.avatar;
                        user.lastLogin = new Date();
                        await user.save();
                        return done(null, user);
                    }
                }

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