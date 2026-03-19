import Breadcrumb from "@/components/BreadCrumb";
import StickyFAQ from "@/components/StickyFAQ";
import StickyLayout from "@/components/StickyLayout";
import Questions from "@/sections/FAQ/Questions";

const faqData = [
  {
    title: "Shipping & Delivery",
    items: [
      {
        question: "How long does shipping take?",
        answer:
          "Our orders typically arrive within 3–7 business days, depending on your location and chosen shipping method. Please note that holidays, weather conditions and peak shopping seasons can affect delivery times.",
      },
      {
        question: "Can I change my shipping address?",
        answer:
          "Yes, you can update your shipping address within 24 hours of placing your order by contacting our support team directly via email or phone.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order ships, you'll receive a tracking number via email. You can use it on our website or the carrier's site to follow your delivery in real time.",
      },
      {
        question: "Do you offer international shipping?",
        answer:
          "Yes, we ship to over 50 countries. International delivery typically takes 7–14 business days depending on your location and local customs processing.",
      },
    ],
  },
  {
    title: "Returns & Refunds",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 30 days of delivery. Items must be unused, in their original packaging, and in the same condition you received them.",
      },
      {
        question: "How do I start a return?",
        answer:
          "Contact our support team with your order number and reason for return. We'll send you a prepaid return label and instructions within 1–2 business days.",
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Once we receive and inspect your return, refunds are processed within 5–7 business days back to your original payment method.",
      },
      {
        question: "Can I exchange a product?",
        answer:
          "Yes, exchanges are available for a different size or shade. Simply initiate a return and place a new order, or contact support for assistance.",
      },
    ],
  },
  {
    title: "Products & Ingredients",
    items: [
      {
        question: "Are your products cruelty-free?",
        answer:
          "Yes, all Purity products are 100% cruelty-free. We never test on animals at any stage of production, and we only partner with suppliers who share the same values.",
      },
      {
        question: "Are the products suitable for sensitive skin?",
        answer:
          "Absolutely. Our formulas are dermatologist-tested and designed with sensitive skin in mind — free from harsh chemicals, parabens, and synthetic fragrances.",
      },
      {
        question: "Where can I find the full ingredient list?",
        answer:
          "The full ingredient list for each product is available on its individual product page. You can also find it printed on the product packaging.",
      },
      {
        question: "Are your products vegan?",
        answer:
          "The majority of our products are vegan. Each product page clearly indicates whether it is vegan-certified. We are continuously working to expand our vegan range.",
      },
    ],
  },
  {
    title: "Orders & Payments",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and Shop Pay.",
      },
      {
        question: "Can I cancel or modify my order?",
        answer:
          "Orders can be cancelled or modified within 1 hour of placement. After that, they enter processing and can no longer be changed. Please contact us immediately if you need to make changes.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes. All transactions are encrypted with SSL technology. We do not store your card details — payments are processed securely through our certified payment providers.",
      },
      {
        question: "Do you offer discounts or promo codes?",
        answer:
          "Yes! Subscribe to our newsletter for 10% off your first order. We also run seasonal promotions — follow us on social media to stay updated.",
      },
    ],
  },
  {
    title: "Account & Privacy",
    items: [
      {
        question: "Do I need an account to place an order?",
        answer:
          "No, you can check out as a guest. However, creating an account lets you track orders, save addresses, and access your order history easily.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Click 'Forgot password' on the login page and enter your email address. You'll receive a reset link within a few minutes. Check your spam folder if you don't see it.",
      },
      {
        question: "How is my personal data used?",
        answer:
          "We use your data only to process orders and improve your shopping experience. We never sell your data to third parties. Read our full Privacy Policy for details.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "You can request account deletion by contacting our support team. We'll process your request within 7 business days in accordance with applicable data protection laws.",
      },
    ],
  },
];

export default function FAQTemplate() {
  return (
    <div className="container mx-auto px-6 py-4">
      <Breadcrumb />
      <div className="flex flex-col gap-6 sm:gap-12">
        <StickyLayout sticky={<StickyFAQ />}>
          <div className="flex flex-col gap-10">
            {faqData.map((section) => (
              <Questions key={section.title} section={section} />
            ))}
          </div>
        </StickyLayout>
      </div>
    </div>
  );
}
