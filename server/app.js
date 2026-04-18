const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/ConnectDB');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Import passport config
require('./config/passport');

const app = express();

// CORS - MUST come first
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Content-Length', 'X-Kuma-Revision']
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser - MUST be BEFORE routes
app.use(cookieParser());

// Session middleware - MUST be before passport
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Test route
app.get('/', (req, res) => {
    res.send('API is running');
});

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes - ALL routes after middleware
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const productColorRoutes = require('./routes/productColorRoutes');
const productSizeRoutes = require('./routes/productSizeRoutes');
const skinTypeRoutes = require('./routes/skinTypeRoutes');
const skinConcernRoutes = require('./routes/skinConcernRoutes');
const skinShadeRoutes = require('./routes/skinShadeRoutes');
const skinColorRoutes = require('./routes/skinColorRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const tagRoutes = require('./routes/tagRoutes');
const homeSectionRoutes = require('./routes/homeSectionRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const badgeRoutes = require('./routes/badgeRoutes');
const userRoutes = require('./routes/userRoutes');
const discountRoutes = require('./routes/discountRoutes');
const brandRoutes = require('./routes/brandRoutes');
const formulationRoutes = require('./routes/formulationRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const cartRoutes = require('./routes/cartRoutes');
const blogRoutes = require('./routes/blogRoutes');
const glowIngredientRoutes = require('./routes/glowIngredientRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/product-colors', productColorRoutes);
app.use('/api/product-sizes', productSizeRoutes);
app.use('/api/skin-types', skinTypeRoutes);
app.use('/api/skin-concerns', skinConcernRoutes);
app.use('/api/skin-shades', skinShadeRoutes);
app.use('/api/skin-colors', skinColorRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/home-sections', homeSectionRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/formulations', formulationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/glow-ingredients', glowIngredientRoutes);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📍 Auth routes: http://localhost:${PORT}/api/auth`);
    console.log(`📍 Google OAuth: http://localhost:${PORT}/api/auth/google`);
});