// app/[locale]/checkout/page.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/BreadCrumb";
import { Tag, Lock, ChevronDown, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cartService, CartItem } from "@/services/cartService";
import { orderService } from "@/services/orderService";
import { toast } from "react-hot-toast";

export default function CheckoutTemplate() {
  const t = useTranslations("CheckoutPage");
  const locale = useLocale();
  const router = useRouter();
  const { user, accessToken, refreshCartCount } = useAuth();

  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");

  // Form states
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const countries = t.raw("shipping.countries") as string[];

  // Load cart items
  useEffect(() => {
    loadCart();
  }, [user]);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setFirstName(user.name?.split(" ")[0] || "");
      setLastName(user.name?.split(" ")[1] || "");
      setPhone(user.phone || "");

      // Pre-fill default address if exists
      const defaultAddress = user.addresses?.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setAddress(defaultAddress.street);
        setCity(defaultAddress.city);
        setZipCode(defaultAddress.zipCode);
        setSelectedCountry(defaultAddress.country);
        setPhone(defaultAddress.phone);
      }
    }
  }, [user]);

  const loadCart = async () => {
    try {
      setLoading(true);
      if (user) {
        const cartItems = await cartService.getCart(
          user._id,
          accessToken || undefined,
        );
        setItems(cartItems);
      } else {
        const localCart = cartService.getLocalCart();
        setItems(localCart);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.price.replace("$", "")) * item.qty,
    0,
  );
  const deliveryCost = delivery === "express" ? 12 : 0;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryCost - discount;

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  // In checkout/page.tsx, update handlePlaceOrder
  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("Please login to place an order");
      router.push(`/${locale}/account/login?returnUrl=/${locale}/checkout`);
      return;
    }

    // Validate required fields
    if (
      !email ||
      !phone ||
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !zipCode ||
      !selectedCountry
    ) {
      toast.error("Please fill in all shipping details");
      return;
    }

    if (!cardNumber || !cardName || !expiry || !cvv) {
      toast.error("Please fill in all payment details");
      return;
    }

    try {
      setPlacing(true);

      // Format items for order
      const orderItems = items.map((item) => ({
        productId: item.productId,
        quantity: item.qty,
        size: item.size || undefined,
        color: item.color || undefined,
        price: parseFloat(item.price.replace("$", "")),
      }));

      const orderData = {
        userId: user._id,
        items: orderItems,
        shippingAddress: {
          fullName: `${firstName} ${lastName}`,
          street: address,
          city,
          state: city,
          zipCode,
          country: selectedCountry,
          phone,
          label: "Home" as const,
          isDefault: false,
        },
        billingAddress: {
          fullName: cardName,
          street: address,
          city,
          state: city,
          zipCode,
          country: selectedCountry,
          phone,
          label: "Home" as const,
          isDefault: false,
        },
        paymentMethod: "card" as const,
        couponCode: promoApplied ? promo : undefined,
        notes: apartment,
      };

      console.log("Sending order data:", JSON.stringify(orderData, null, 2));

      const order = await orderService.create(orderData);

      // Clear cart after successful order
      if (user) {
        for (const item of items) {
          await cartService.removeItem(
            user._id,
            item.id,
            accessToken || undefined,
          );
        }
      } else {
        cartService.clearLocalCart();
      }

      if (refreshCartCount) refreshCartCount();

      toast.success("Order placed successfully!");
      router.push(`/${locale}/checkout/success?orderId=${order._id}`);
    } catch (error: any) {
      console.error("Full error object:", error);
      console.error("Error message:", error.message);
      console.error("Error response:", error.response);
      toast.error(error.message || "Failed to place order. Please try again.");
      router.push(`/${locale}/checkout/fail`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#1f473e]" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Your cart is empty</p>
        <Link
          href={`/${locale}/shop`}
          className="mt-4 inline-block text-[#1f473e] underline"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3.5 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#1f473e] transition-colors bg-white";

  return (
    <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
      <Breadcrumb overrideLastLabel={t("breadcrumb")} />

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-6 mb-8">
        {t("title")}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">
        {/* Left — forms */}
        <div className="flex flex-col gap-6">
          {/* Contact */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-4">
            <h2 className="font-bold text-gray-900 text-lg">
              {t("contact.title")}
            </h2>
            <input
              type="email"
              placeholder={t("contact.email")}
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder={t("contact.phone")}
              className={inputClass}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-4">
            <h2 className="font-bold text-gray-900 text-lg">
              {t("shipping.title")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t("shipping.firstName")}
                className={inputClass}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder={t("shipping.lastName")}
                className={inputClass}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <input
              type="text"
              placeholder={t("shipping.address")}
              className={inputClass}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder={t("shipping.apartment")}
              className={inputClass}
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t("shipping.city")}
                className={inputClass}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder={t("shipping.zip")}
                className={inputClass}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>
            {/* Country dropdown */}
            <div className="relative">
              <button
                onClick={() => setCountryOpen(!countryOpen)}
                className={`${inputClass} flex items-center justify-between text-left ${!selectedCountry ? "text-gray-400" : "text-gray-700"}`}
              >
                {selectedCountry || t("shipping.country")}
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform ${countryOpen ? "rotate-180" : ""}`}
                />
              </button>
              {countryOpen && (
                <div className="absolute top-14 left-0 right-0 z-20 bg-white border border-gray-100 rounded-2xl shadow-lg py-2 max-h-48 overflow-y-auto">
                  {countries.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCountry(c);
                        setCountryOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${selectedCountry === c ? "font-semibold text-gray-900" : "text-gray-600"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Delivery */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-4">
            <h2 className="font-bold text-gray-900 text-lg">
              {t("delivery.title")}
            </h2>
            {[
              {
                key: "standard" as const,
                label: t("delivery.standard"),
                desc: t("delivery.standardDesc"),
                price: t("delivery.standardPrice"),
              },
              {
                key: "express" as const,
                label: t("delivery.express"),
                desc: t("delivery.expressDesc"),
                price: t("delivery.expressPrice"),
              },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setDelivery(opt.key)}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${delivery === opt.key ? "border-[#1f473e] bg-[#1f473e]/5" : "border-gray-100 hover:border-gray-200"}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${delivery === opt.key ? "border-[#1f473e]" : "border-gray-300"}`}
                  >
                    {delivery === opt.key && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1f473e]" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      {opt.label}
                    </p>
                    <p className="text-xs text-gray-400">{opt.desc}</p>
                  </div>
                </div>
                <span
                  className={`text-sm font-bold ${opt.key === "standard" ? "text-green-600" : "text-gray-900"}`}
                >
                  {opt.price}
                </span>
              </button>
            ))}
          </div>

          {/* Payment */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-4">
            <h2 className="font-bold text-gray-900 text-lg">
              {t("payment.title")}
            </h2>

            <div className="relative">
              <input
                type="text"
                placeholder={t("payment.cardNumber")}
                maxLength={19}
                className={inputClass}
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(formatCardNumber(e.target.value))
                }
                required
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                {["visa", "mc"].map((card) => (
                  <div
                    key={card}
                    className="w-8 h-5 bg-gray-100 rounded flex items-center justify-center"
                  >
                    <span
                      className={`text-[8px] font-bold ${card === "visa" ? "text-blue-700" : "text-red-500"}`}
                    >
                      {card === "visa" ? "VISA" : "MC"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder={t("payment.cardName")}
              className={inputClass}
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t("payment.expiry")}
                maxLength={5}
                className={inputClass}
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                required
              />
              <input
                type="text"
                placeholder={t("payment.cvv")}
                maxLength={3}
                className={inputClass}
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
                required
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Lock className="w-3.5 h-3.5 shrink-0" />
              {t("payment.secure")}
            </div>
          </div>
        </div>

        {/* Right — order summary */}
        <div className="lg:sticky lg:top-24 flex flex-col gap-4">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col gap-5">
            <h2 className="font-bold text-gray-900 text-lg">
              {t("summary.title")}
            </h2>

            {/* Items */}
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative w-14 h-14 shrink-0">
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-[#f0ebe2]">
                      <Image
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-[#1f473e] text-white text-[10px] font-bold rounded-full flex items-center justify-center z-10">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">
                      {item.name}
                    </p>
                    {item.size && (
                      <p className="text-xs text-gray-400">Size: {item.size}</p>
                    )}
                    {item.color && (
                      <p className="text-xs text-gray-400">
                        Color: {item.color}
                      </p>
                    )}
                  </div>
                  <p className="text-sm font-bold text-gray-900 shrink-0">
                    $
                    {(
                      parseFloat(item.price.replace("$", "")) * item.qty
                    ).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100" />

            {/* Promo */}
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                <Tag className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder={t("summary.promoPlaceholder")}
                  className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400 min-w-0"
                />
              </div>
              <button
                onClick={() => {
                  if (promo) setPromoApplied(true);
                }}
                className="shrink-0 w-20 px-3 py-2.5 bg-gray-900 text-white text-xs font-medium rounded-xl hover:bg-gray-800 transition-colors text-center leading-tight"
              >
                {t("summary.apply")}
              </button>
            </div>
            {promoApplied && (
              <p className="text-xs text-green-600 font-medium -mt-2">
                {t("summary.promoApplied")}
              </p>
            )}

            <div className="border-t border-gray-100" />

            {/* Totals */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">{t("summary.subtotal")}</span>
                <span className="font-medium text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>{t("summary.discount")}</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">{t("summary.shipping")}</span>
                <span
                  className={
                    delivery === "standard"
                      ? "text-green-600 font-medium"
                      : "font-medium text-gray-900"
                  }
                >
                  {delivery === "standard"
                    ? t("summary.free")
                    : `+$${deliveryCost.toFixed(2)}`}
                </span>
              </div>
              <p className="text-xs text-gray-400">{t("summary.taxes")}</p>
              <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-base">
                <span>{t("summary.total")}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Place order */}
            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="w-full py-4 bg-[#1f473e] text-white font-bold text-sm rounded-full hover:bg-[#163830] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {placing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t("summary.processing")}
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  {t("summary.placeOrder")} — ${total.toFixed(2)}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add import for getImageUrl at the top
import { getImageUrl } from "@/utils/imageUrl";
