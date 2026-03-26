// app/admin/blogs/page.tsx
"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, Loader2 } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";
import RichTextEditor from "@/components/Admin/RichTextEditor";
import { blogService } from "@/services/blogService";
import { uploadService } from "@/services/uploadService";
import { BlogPost, ContentBlock } from "@/types/blog";
import { toast } from "react-hot-toast";
import Image from "next/image";

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";

const categories = [
  "Tips",
  "Reviews",
  "Guide",
  "Holidays",
  "Gifting",
  "Self-Care",
  "Trends",
  "Ingredients",
];

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [viewing, setViewing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<Partial<BlogPost>>({
    status: "draft",
    author: "Admin",
    content: [],
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);

  // Get token from localStorage
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const { blogs } = await blogService.getAll();
      setPosts(blogs);
    } catch (error) {
      console.error("Error loading blogs:", error);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleFeaturedImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const url = await uploadService.uploadBlogImage(file);
      setForm({ ...form, featuredImage: url });
      toast.success("Featured image uploaded");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm({
      status: "draft",
      author: "Admin",
      content: [],
      category: categories[0],
    });
    setModalOpen(true);
  };

  const openEdit = (p: BlogPost) => {
    setEditing(p);
    setForm(p);
    setModalOpen(true);
  };

  const openView = (p: BlogPost) => {
    setViewing(p);
    setViewModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const token = getToken();
      await blogService.delete(id, token);
      toast.success("Blog deleted successfully");
      await loadPosts();
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Generate slug from title if not provided
      let slug = form.slug;
      if (!slug && form.title) {
        slug = form.title
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .replace(/\s+/g, "-");
      }

      const blogData = {
        ...form,
        slug,
        excerpt:
          form.excerpt || form.content?.[0]?.text?.substring(0, 150) || "",
      };

      const token = getToken();

      if (editing) {
        await blogService.update(editing._id, blogData, token);
        toast.success("Blog updated successfully");
      } else {
        await blogService.create(blogData, token);
        toast.success("Blog created successfully");
      }

      setModalOpen(false);
      await loadPosts();
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Failed to save blog");
    } finally {
      setSaving(false);
    }
  };

  const columns: Column<BlogPost>[] = [
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-gray-900">{row.title}</span>
      ),
    },
    { key: "author", label: "Author" },
    {
      key: "category",
      label: "Category",
      render: (row) => <AdminBadge label={row.category} color="blue" />,
    },
    {
      key: "publishedAt",
      label: "Date",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-500">
          {row.publishedAt
            ? new Date(row.publishedAt).toLocaleDateString()
            : row.createdAt?.split("T")[0]}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <AdminBadge
          label={row.status}
          color={row.status === "published" ? "green" : "gray"}
        />
      ),
    },
    {
      key: "views",
      label: "Views",
      render: (row) => (
        <span className="text-sm text-gray-500">{row.views || 0}</span>
      ),
    },
    {
      key: "actions",
      label: "",
      width: "w-28",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => openView(row)}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-gray-500" />
          </button>
          <button
            onClick={() => openEdit(row)}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5 text-gray-500" />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-[#1f473e]" />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Blog Posts"
        subtitle={`${posts.length} posts · ${posts.filter((p) => p.status === "published").length} published`}
        action={
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Post
          </button>
        }
      />
      <AdminTable
        columns={columns}
        data={posts}
        searchKeys={["title", "author", "category"]}
      />

      {/* Add/Edit Modal */}
      <AdminModal
        title={editing ? "Edit Post" : "Add Post"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      >
        <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto px-1">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Title *
            </label>
            <input
              value={form.title ?? ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
              placeholder="Post title"
              required
            />
          </div>

          {/* Slug */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Slug (URL)
            </label>
            <input
              value={form.slug ?? ""}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className={inputClass}
              placeholder="auto-generated-from-title"
            />
          </div>

          {/* Author and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Author
              </label>
              <input
                value={form.author ?? "Admin"}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Category *
              </label>
              <select
                value={form.category ?? categories[0]}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value as any })
                }
                className={inputClass}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Featured Image */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Featured Image
            </label>
            <div className="flex gap-3 items-start">
              {form.featuredImage && (
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={form.featuredImage}
                    alt="Featured"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFeaturedImageUpload}
                  className="hidden"
                  id="featured-image-upload"
                />
                <label
                  htmlFor="featured-image-upload"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  {uploadingImage ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Upload Image"
                  )}
                </label>
                {form.featuredImage && (
                  <input
                    type="text"
                    value={form.featuredImage}
                    onChange={(e) =>
                      setForm({ ...form, featuredImage: e.target.value })
                    }
                    className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm"
                    placeholder="Or enter image URL"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Excerpt (Short Description)
            </label>
            <textarea
              value={form.excerpt ?? ""}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className={`${inputClass} resize-none`}
              rows={3}
              placeholder="Brief summary of the post (max 200 characters)"
              maxLength={200}
            />
          </div>

          {/* Content Editor */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Content *
            </label>
            <RichTextEditor
              value={form.content || []}
              onChange={(blocks) => setForm({ ...form, content: blocks })}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tags (comma separated)
            </label>
            <input
              value={form.tags?.join(", ") ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  tags: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
              className={inputClass}
              placeholder="skincare, tips, routine"
            />
          </div>

          {/* SEO Fields */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              SEO Title
            </label>
            <input
              value={form.seoTitle ?? ""}
              onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
              className={inputClass}
              placeholder="SEO optimized title"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              SEO Description
            </label>
            <textarea
              value={form.seoDescription ?? ""}
              onChange={(e) =>
                setForm({ ...form, seoDescription: e.target.value })
              }
              className={`${inputClass} resize-none`}
              rows={2}
              placeholder="Meta description for search engines"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </label>
            <select
              value={form.status ?? "draft"}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as BlogPost["status"],
                })
              }
              className={inputClass}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
      </AdminModal>

      {/* View Modal */}
      <AdminModal
        title="Blog Preview"
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
      >
        {viewing && (
          <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
            {viewing.featuredImage && (
              <div className="relative w-full h-48 rounded-xl overflow-hidden">
                <img
                  src={viewing.featuredImage}
                  alt={viewing.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <span className="inline-block bg-[#c0392b] text-white text-xs font-medium px-3 py-1 rounded-full mb-2">
                {viewing.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                {viewing.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                <span>{viewing.author}</span>
                <span>•</span>
                <span>
                  {viewing.publishedAt
                    ? new Date(viewing.publishedAt).toLocaleDateString()
                    : "Draft"}
                </span>
              </div>
            </div>
            <p className="text-gray-600">{viewing.excerpt}</p>
            {viewing.content && viewing.content.length > 0 && (
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Content Preview:
                </p>
                <div className="space-y-2">
                  {viewing.content.slice(0, 3).map((block, i) => (
                    <div key={i} className="text-sm text-gray-600">
                      {block.type === "image"
                        ? "📷 Image"
                        : block.type === "h2"
                          ? "📌 " + (block.text || "Heading")
                          : block.text?.substring(0, 100)}
                    </div>
                  ))}
                  {viewing.content.length > 3 && (
                    <p className="text-xs text-gray-400">
                      + {viewing.content.length - 3} more blocks
                    </p>
                  )}
                </div>
              </div>
            )}
            {viewing.tags && viewing.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {viewing.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </AdminModal>
    </div>
  );
}
