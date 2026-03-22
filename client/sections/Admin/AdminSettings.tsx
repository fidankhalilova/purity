"use client";
import { useState } from "react";
import { Save } from "lucide-react";

const inputClass =
  "w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors";

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    storeName: "Purity",
    storeEmail: "hello@purity.com",
    currency: "USD",
    timezone: "UTC",
    freeShippingThreshold: "175",
    taxRate: "0",
    maintenanceMode: false,
    reviewsEnabled: true,
    guestCheckout: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Toggle = ({
    value,
    onChange,
  }: {
    value: boolean;
    onChange: () => void;
  }) => (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${value ? "bg-[#1f473e]" : "bg-gray-200"}`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow-sm ${value ? "translate-x-5" : "translate-x-0.5"}`}
      />
    </button>
  );

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-5">
      <h3 className="font-bold text-gray-900 text-base">{title}</h3>
      {children}
    </div>
  );

  const Field = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {saved && (
        <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-2xl border border-green-100">
          ✓ Settings saved successfully
        </div>
      )}

      <Section title="Store Information">
        <Field label="Store Name">
          <input
            value={settings.storeName}
            onChange={(e) =>
              setSettings({ ...settings, storeName: e.target.value })
            }
            className={inputClass}
          />
        </Field>
        <Field label="Store Email">
          <input
            value={settings.storeEmail}
            onChange={(e) =>
              setSettings({ ...settings, storeEmail: e.target.value })
            }
            className={inputClass}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Currency">
            <select
              value={settings.currency}
              onChange={(e) =>
                setSettings({ ...settings, currency: e.target.value })
              }
              className={inputClass}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="AZN">AZN (₼)</option>
            </select>
          </Field>
          <Field label="Timezone">
            <select
              value={settings.timezone}
              onChange={(e) =>
                setSettings({ ...settings, timezone: e.target.value })
              }
              className={inputClass}
            >
              <option value="UTC">UTC</option>
              <option value="Asia/Baku">Asia/Baku</option>
              <option value="Europe/London">Europe/London</option>
            </select>
          </Field>
        </div>
      </Section>

      <Section title="Shipping & Tax">
        <Field label="Free Shipping Threshold ($)">
          <input
            type="number"
            value={settings.freeShippingThreshold}
            onChange={(e) =>
              setSettings({
                ...settings,
                freeShippingThreshold: e.target.value,
              })
            }
            className={inputClass}
          />
        </Field>
        <Field label="Tax Rate (%)">
          <input
            type="number"
            value={settings.taxRate}
            onChange={(e) =>
              setSettings({ ...settings, taxRate: e.target.value })
            }
            className={inputClass}
          />
        </Field>
      </Section>

      <Section title="Features">
        {[
          {
            key: "maintenanceMode" as const,
            label: "Maintenance Mode",
            desc: "Hide the store from visitors",
          },
          {
            key: "reviewsEnabled" as const,
            label: "Customer Reviews",
            desc: "Allow customers to leave reviews",
          },
          {
            key: "guestCheckout" as const,
            label: "Guest Checkout",
            desc: "Allow checkout without account",
          },
        ].map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
            </div>
            <Toggle
              value={settings[key]}
              onChange={() =>
                setSettings({ ...settings, [key]: !settings[key] })
              }
            />
          </div>
        ))}
      </Section>

      <button
        onClick={handleSave}
        className="self-start flex items-center gap-2 px-6 py-3 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors"
      >
        <Save className="w-4 h-4" />
        Save Settings
      </button>
    </div>
  );
}
