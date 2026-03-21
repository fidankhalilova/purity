"use client";
import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";

type Product = {
  id: string;
  name: string;
  price: string;
  stock: number;
  category: string;
  status: "active" | "draft";
  image: string;
};

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Dark Circle Patch",
    price: "$75.00",
    stock: 120,
    category: "Eye Care",
    status: "active",
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=200",
  },
  {
    id: "2",
    name: "Pore Detox Scrub",
    price: "$70.00",
    stock: 45,
    category: "Cleanser",
    status: "active",
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=200",
  },
  {
    id: "3",
    name: "Brighten Serum",
    price: "$160.00",
    stock: 30,
    category: "Serum",
    status: "active",
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=200",
  },
  {
    id: "4",
    name: "Clear Away Cleanser",
    price: "$26.00",
    stock: 0,
    category: "Cleanser",
    status: "draft",
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=200",
  },
];

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";

export default function AdminProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Partial<Product>>({});

  const openAdd = () => {
    setEditing(null);
    setForm({ status: "active" });
    setModalOpen(true);
  };
  const openEdit = (p: Product) => {
    setEditing(p);
    setForm(p);
    setModalOpen(true);
  };
  const handleDelete = (id: string) =>
    setProducts(products.filter((p) => p.id !== id));

  const handleSave = () => {
    if (editing) {
      setProducts(
        products.map((p) =>
          p.id === editing.id ? ({ ...p, ...form } as Product) : p,
        ),
      );
    } else {
      setProducts([
        ...products,
        { ...form, id: String(Date.now()) } as Product,
      ]);
    }
    setModalOpen(false);
  };

  const columns: Column<Product>[] = [
    {
      key: "name",
      label: "Product",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 shrink-0 rounded-xl overflow-hidden bg-[#f0ebe2]">
            <Image
              src={row.image}
              alt={row.name}
              fill
              className="object-contain p-1"
            />
          </div>
          <span className="font-semibold text-gray-900">{row.name}</span>
        </div>
      ),
    },
    { key: "category", label: "Category", sortable: true },
    { key: "price", label: "Price", sortable: true },
    {
      key: "stock",
      label: "Stock",
      sortable: true,
      render: (row) => (
        <span
          className={`font-semibold ${row.stock === 0 ? "text-red-500" : row.stock < 20 ? "text-yellow-600" : "text-gray-900"}`}
        >
          {row.stock === 0 ? "Out of stock" : row.stock}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <AdminBadge
          label={row.status}
          color={row.status === "active" ? "green" : "gray"}
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
        title="Products"
        subtitle={`${products.length} total products`}
        action={
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        }
      />

      <AdminTable
        columns={columns}
        data={products}
        searchKeys={["name", "category"]}
      />

      <AdminModal
        title={editing ? "Edit Product" : "Add Product"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Name
            </label>
            <input
              value={form.name ?? ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
              placeholder="Product name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Price
              </label>
              <input
                value={form.price ?? ""}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className={inputClass}
                placeholder="$0.00"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Stock
              </label>
              <input
                type="number"
                value={form.stock ?? ""}
                onChange={(e) =>
                  setForm({ ...form, stock: Number(e.target.value) })
                }
                className={inputClass}
                placeholder="0"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Category
            </label>
            <input
              value={form.category ?? ""}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={inputClass}
              placeholder="Category"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </label>
            <select
              value={form.status ?? "active"}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as "active" | "draft",
                })
              }
              className={inputClass}
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
