"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Camera } from "lucide-react";

export default function ProfileSection() {
  const t = useTranslations("AccountPage.profile");
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "Isabella D.",
    email: "isabella@example.com",
    phone: "+1 (555) 000-1234",
    birthday: "1995-06-15",
    gender: "female",
  });

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const genderOptions = [
    { value: "female", label: t("genderOptions.female") },
    { value: "male", label: t("genderOptions.male") },
    { value: "other", label: t("genderOptions.other") },
  ];

  const Field = ({
    label,
    name,
    type = "text",
    options,
  }: {
    label: string;
    name: keyof typeof form;
    type?: string;
    options?: { value: string; label: string }[];
  }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      {options ? (
        <select
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          disabled={!editing}
          className="px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-[#1f473e] disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          disabled={!editing}
          className="px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-[#1f473e] disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
        />
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
        </div>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="self-start sm:self-auto px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors"
          >
            {t("editProfile")}
          </button>
        ) : (
          <div className="flex gap-2 self-start sm:self-auto">
            <button
              onClick={() => setEditing(false)}
              className="px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors"
            >
              {t("cancel")}
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-[#1f473e] text-white text-sm font-medium rounded-full hover:bg-[#163830] transition-colors"
            >
              {t("saveChanges")}
            </button>
          </div>
        )}
      </div>

      {saved && (
        <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-2xl border border-green-100">
          {t("successMessage")}
        </div>
      )}

      <div className="bg-[#f0ebe2] rounded-3xl p-5 md:p-6 flex flex-col sm:flex-row items-center gap-4 md:gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-[#1f473e] flex items-center justify-center text-white text-2xl font-bold">
            {form.name.charAt(0)}
          </div>
          {editing && (
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
              <Camera className="w-3.5 h-3.5 text-gray-600" />
            </button>
          )}
        </div>
        <div className="text-center sm:text-left">
          <p className="font-bold text-gray-900 text-lg">{form.name}</p>
          <p className="text-sm text-gray-500">{form.email}</p>
          {editing && (
            <button className="text-xs text-[#1f473e] font-medium mt-1 hover:underline">
              {t("avatar")}
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 p-5 md:p-6">
        <h2 className="font-bold text-gray-900 mb-5">{t("personalInfo")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label={t("fullName")} name="name" />
          <Field label={t("emailAddress")} name="email" type="email" />
          <Field label={t("phoneNumber")} name="phone" type="tel" />
          <Field label={t("birthday")} name="birthday" type="date" />
          <Field label={t("gender")} name="gender" options={genderOptions} />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 p-5 md:p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-gray-900">{t("savedAddresses")}</h2>
          <button className="text-sm text-[#1f473e] font-medium hover:underline">
            {t("addNew")}
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {[
            {
              label: "Home",
              address: "123 Glow St, New York, NY 10001",
              default: true,
            },
            {
              label: "Work",
              address: "456 Beauty Ave, Brooklyn, NY 11201",
              default: false,
            },
          ].map((addr) => (
            <div
              key={addr.label}
              className="flex items-start justify-between gap-4 p-4 border border-gray-100 rounded-2xl"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900">
                    {addr.label}
                  </span>
                  {addr.default && (
                    <span className="text-xs bg-[#1f473e]/10 text-[#1f473e] px-2 py-0.5 rounded-full font-medium">
                      {t("default")}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{addr.address}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                  {t("edit")}
                </button>
                <button className="text-xs text-red-400 hover:text-red-600 transition-colors">
                  {t("remove")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
