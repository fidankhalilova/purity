"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff } from "lucide-react";
import AdminTable, { Column } from "@/components/Admin/AdminTable";
import AdminModal from "@/components/Admin/AdminModal";
import AdminPageHeader from "@/components/Admin/AdminPageHeader";
import AdminBadge from "@/components/Admin/AdminBadge";
import { userService } from "@/services/userService";
import { User, NotificationSettings } from "@/types/user";
import { toast } from "react-hot-toast";

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";

const defaultNotificationSettings: NotificationSettings = {
  orderUpdates: true,
  shippingDelivery: true,
  promotionsOffers: true,
  newsletter: false,
  smsNotifications: false,
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState<Partial<User & { password: string }>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const data = await userService.getAll(token);
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm({
      role: "customer",
      status: "active",
      gender: "other",
      displayLanguage: "en",
      notificationSettings: { ...defaultNotificationSettings },
    });
    setModalOpen(true);
  };

  const openEdit = (user: User) => {
    setEditing(user);
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      birthday: user.birthday?.split("T")[0] || "",
      gender: user.gender,
      role: user.role,
      status: user.status,
      displayLanguage: user.displayLanguage,
      notificationSettings: user.notificationSettings || {
        ...defaultNotificationSettings,
      },
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      setSubmitting(true);
      const token = getToken();
      await userService.delete(id, token);
      toast.success("User deleted successfully");
      await loadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    try {
      setSubmitting(true);
      const token = getToken();
      await userService.updateStatus(id, newStatus, token);
      toast.success(
        `User ${newStatus === "active" ? "activated" : "blocked"} successfully`,
      );
      await loadUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Failed to update user status");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async () => {
    try {
      setSubmitting(true);
      const token = getToken();

      const dataToSave = {
        ...form,
        notificationSettings: {
          orderUpdates: form.notificationSettings?.orderUpdates ?? true,
          shippingDelivery: form.notificationSettings?.shippingDelivery ?? true,
          promotionsOffers: form.notificationSettings?.promotionsOffers ?? true,
          newsletter: form.notificationSettings?.newsletter ?? false,
          smsNotifications:
            form.notificationSettings?.smsNotifications ?? false,
        },
      };

      if (editing) {
        await userService.update(editing._id, dataToSave, token);
        toast.success("User updated successfully");
      } else {
        if (!dataToSave.password) {
          toast.error("Password is required");
          return;
        }
        await userService.create(
          dataToSave as User & { password: string },
          token,
        );
        toast.success("User created successfully");
      }

      await loadUsers();
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Failed to save user");
    } finally {
      setSubmitting(false);
    }
  };

  const updateNotificationSetting = (
    key: keyof NotificationSettings,
    value: boolean,
  ) => {
    setForm({
      ...form,
      notificationSettings: {
        orderUpdates: form.notificationSettings?.orderUpdates ?? true,
        shippingDelivery: form.notificationSettings?.shippingDelivery ?? true,
        promotionsOffers: form.notificationSettings?.promotionsOffers ?? true,
        newsletter: form.notificationSettings?.newsletter ?? false,
        smsNotifications: form.notificationSettings?.smsNotifications ?? false,
        [key]: value,
      },
    });
  };

  const formatTotalSpent = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const genderLabels: Record<string, string> = {
    male: "Male",
    female: "Female",
    other: "Other",
  };

  const languageLabels: Record<string, string> = {
    en: "English",
    az: "Azerbaijani",
    ru: "Russian",
  };

  const columns: Column<User>[] = [
    {
      key: "name",
      label: "User",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-400">{row.email}</p>
        </div>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      render: (row) => <span className="text-sm">{row.phone || "-"}</span>,
    },
    {
      key: "joined",
      label: "Joined",
      sortable: true,
      render: (row) => <span className="text-sm">{row.joined}</span>,
    },
    {
      key: "orderCount",
      label: "Orders",
      sortable: true,
      render: (row) => <span className="font-semibold">{row.orderCount}</span>,
    },
    {
      key: "totalSpent",
      label: "Total Spent",
      sortable: true,
      render: (row) => (
        <span className="font-bold">{formatTotalSpent(row.totalSpent)}</span>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (row) => (
        <AdminBadge
          label={row.role}
          color={row.role === "admin" ? "blue" : "green"}
        />
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <button
          onClick={() => handleStatusToggle(row._id, row.status)}
          disabled={submitting}
          className="cursor-pointer"
        >
          <AdminBadge
            label={row.status}
            color={row.status === "active" ? "green" : "red"}
          />
        </button>
      ),
    },
    {
      key: "actions",
      label: "",
      width: "w-32",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEdit(row)}
            disabled={submitting}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <Pencil className="w-3.5 h-3.5 text-gray-500" />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            disabled={submitting}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#1f473e]" />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Users"
        subtitle={`${users.length} registered users`}
        action={
          <button
            onClick={openAdd}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add User
          </button>
        }
      />
      <AdminTable
        columns={columns}
        data={users}
        searchKeys={["name", "email", "phone"]}
      />

      <AdminModal
        title={editing ? "Edit User" : "Add User"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      >
        <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto px-1">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Name *
              </label>
              <input
                value={form.name ?? ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email *
              </label>
              <input
                type="email"
                value={form.email ?? ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                placeholder="user@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Phone
              </label>
              <input
                type="tel"
                value={form.phone ?? ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
                placeholder="+1 (555) 000-1234"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Birthday
              </label>
              <input
                type="date"
                value={form.birthday ?? ""}
                onChange={(e) => setForm({ ...form, birthday: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Gender
              </label>
              <select
                value={form.gender ?? "other"}
                onChange={(e) =>
                  setForm({
                    ...form,
                    gender: e.target.value as "male" | "female" | "other",
                  })
                }
                className={inputClass}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Language
              </label>
              <select
                value={form.displayLanguage ?? "en"}
                onChange={(e) =>
                  setForm({
                    ...form,
                    displayLanguage: e.target.value as "en" | "az" | "ru",
                  })
                }
                className={inputClass}
              >
                <option value="en">English</option>
                <option value="az">Azerbaijani</option>
                <option value="ru">Russian</option>
              </select>
            </div>
          </div>

          {!editing && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className={`${inputClass} pr-10`}
                  placeholder="••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Role
              </label>
              <select
                value={form.role ?? "customer"}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value as "customer" | "admin",
                  })
                }
                className={inputClass}
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
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
                    status: e.target.value as "active" | "blocked",
                  })
                }
                className={inputClass}
              >
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="border-t border-gray-100 pt-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Notification Settings
            </p>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.notificationSettings?.orderUpdates ?? true}
                  onChange={(e) =>
                    updateNotificationSetting("orderUpdates", e.target.checked)
                  }
                  className="rounded border-gray-300 text-[#1f473e] focus:ring-[#1f473e]"
                />
                Order Updates
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.notificationSettings?.shippingDelivery ?? true}
                  onChange={(e) =>
                    updateNotificationSetting(
                      "shippingDelivery",
                      e.target.checked,
                    )
                  }
                  className="rounded border-gray-300 text-[#1f473e] focus:ring-[#1f473e]"
                />
                Shipping & Delivery
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.notificationSettings?.promotionsOffers ?? true}
                  onChange={(e) =>
                    updateNotificationSetting(
                      "promotionsOffers",
                      e.target.checked,
                    )
                  }
                  className="rounded border-gray-300 text-[#1f473e] focus:ring-[#1f473e]"
                />
                Promotions & Offers
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.notificationSettings?.newsletter ?? false}
                  onChange={(e) =>
                    updateNotificationSetting("newsletter", e.target.checked)
                  }
                  className="rounded border-gray-300 text-[#1f473e] focus:ring-[#1f473e]"
                />
                Newsletter
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.notificationSettings?.smsNotifications ?? false}
                  onChange={(e) =>
                    updateNotificationSetting(
                      "smsNotifications",
                      e.target.checked,
                    )
                  }
                  className="rounded border-gray-300 text-[#1f473e] focus:ring-[#1f473e]"
                />
                SMS Notifications
              </label>
            </div>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
