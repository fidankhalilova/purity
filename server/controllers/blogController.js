const Blog = require('../models/Blog');

const getAllBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = {};

        if (req.query.status) query.status = req.query.status;
        if (req.query.category) query.category = req.query.category;
        if (req.query.search) {
            query.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { excerpt: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        if (!req.userId || req.userRole !== 'admin') {
            query.status = 'published';
        }

        const blogs = await Blog.find(query)
            .sort({ publishedAt: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Blog.countDocuments(query);

        res.status(200).json({
            success: true,
            data: blogs,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error in getAllBlogs:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getBlogBySlug = async (req, res) => {
    try {
        console.log('Fetching blog by slug:', req.params.slug);

        const blog = await Blog.findOne({ slug: req.params.slug });

        if (!blog) {
            console.log('Blog not found for slug:', req.params.slug);
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        blog.views += 1;
        await blog.save();

        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        console.error('Error in getBlogBySlug:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        console.error('Error in getBlogById:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const createBlog = async (req, res) => {
    try {
        const { title, slug, author, category, featuredImage, excerpt, content, status, tags, seoTitle, seoDescription } = req.body;

        let blogSlug = slug;
        if (!blogSlug) {
            blogSlug = title
                .toLowerCase()
                .replace(/[^\w\s]/g, '')
                .replace(/\s+/g, '-');
        }

        const existingBlog = await Blog.findOne({ slug: blogSlug });
        if (existingBlog) {
            blogSlug = `${blogSlug}-${Date.now()}`;
        }

        const blog = new Blog({
            title,
            slug: blogSlug,
            author: author || 'Admin',
            category,
            featuredImage,
            excerpt,
            content: content || [],
            status: status || 'draft',
            tags: tags || [],
            seoTitle,
            seoDescription,
            publishedAt: status === 'published' ? new Date() : undefined
        });

        await blog.save();

        res.status(201).json({ success: true, data: blog });
    } catch (error) {
        console.error('Error in createBlog:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { title, slug, author, category, featuredImage, excerpt, content, status, tags, seoTitle, seoDescription } = req.body;

        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        if (title) blog.title = title;
        if (slug) blog.slug = slug;
        if (author) blog.author = author;
        if (category) blog.category = category;
        if (featuredImage) blog.featuredImage = featuredImage;
        if (excerpt) blog.excerpt = excerpt;
        if (content) blog.content = content;
        if (tags) blog.tags = tags;
        if (seoTitle) blog.seoTitle = seoTitle;
        if (seoDescription) blog.seoDescription = seoDescription;

        if (status && status !== blog.status) {
            blog.status = status;
            if (status === 'published' && !blog.publishedAt) {
                blog.publishedAt = new Date();
            }
        }

        await blog.save();

        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        console.error('Error in updateBlog:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error in deleteBlog:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getFeaturedBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ status: 'published' })
            .sort({ views: -1, publishedAt: -1 })
            .limit(5);

        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        console.error('Error in getFeaturedBlogs:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getRelatedBlogs = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        const related = await Blog.find({
            _id: { $ne: blog._id },
            status: 'published',
            category: blog.category
        })
            .limit(4)
            .sort({ publishedAt: -1 });

        res.status(200).json({ success: true, data: related });
    } catch (error) {
        console.error('Error in getRelatedBlogs:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllBlogs,
    getBlogBySlug,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    getFeaturedBlogs,
    getRelatedBlogs
};