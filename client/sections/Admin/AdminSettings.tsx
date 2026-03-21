"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";

type BlogPost = {
  id: string;
  title: string;
  author: string;
  category: string;
  date: string;
  status: "published" | "draft";
};

const initialPosts: BlogPost[] = [
  {
    id: "1",
    title: "Glow in 3 Steps",
    author: "Admin",
    category: "Tips",
    date: "Mar 01, 2026",
    status: "published",
  },
  {
    id: "2",
    title: "Best Eye Patches 2026",
    author: "Admin",
    category: "Reviews",
    date: "Feb 15, 2026",
    status: "published",
  },
  {
    id: "3",
    title: "Skincare Routine Guide",
    author: "Admin",
    category: "Guide",
    date: "Jan 10, 2026",
    status: "draft",
  },
];

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";

export default function AdminBlog() {
  const [posts, setPosts] = useState(initialPosts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<Partial<BlogPost>>({});

  const openAdd = () => {
    setEditing(null);
    setForm({ status: "draft", author: "Admin" });
    setModalOpen(true);
  };
  const openEdit = (p: BlogPost) => {
    setEditing(p);
    setForm(p);
    setModalOpen(true);
  };
  const handleDelete = (id: string) =>
    setPosts(posts.filter((p) => p.id !== id));
  const handleSave = () => {
    if (editing)
      setPosts(
        posts.map((p) =>
          p.id === editing.id ? ({ ...p, ...form } as BlogPost) : p,
        ),
      );
    else setPosts([...posts, { ...form, id: String(Date.now()) } as BlogPost]);
    setModalOpen(false);
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
    { key: "date", label: "Date", sortable: true },
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
      key: "actions",
      label: "",
      width: "w-20",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEdit(row)}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5 text-gray-500" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Blog Posts"
        subtitle={`${posts.length} posts`}
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

      <AdminModal
        title={editing ? "Edit Post" : "Add Post"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Title
            </label>
            <input
              value={form.title ?? ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
              placeholder="Post title"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Author
              </label>
              <input
                value={form.author ?? ""}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Category
              </label>
              <input
                value={form.category ?? ""}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputClass}
                placeholder="Tips, Guide..."
              />
            </div>
          </div>
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
    </div>
  );
}
