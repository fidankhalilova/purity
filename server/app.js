const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/ConnectDB');
const cors = require('cors');

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

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Your Next.js frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('API is running');
});

// API Routes
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


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});