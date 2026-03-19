"use client";
import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSection = {
  title: string;
  items: FAQItem[];
};

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left gap-4"
      >
        <span className="text-base font-semibold text-gray-900">
          {item.question}
        </span>
        <span className="shrink-0 text-gray-500 transition-transform duration-300">
          {open ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          )}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-sm text-gray-500 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export default function Questions({ section }: { section: FAQSection }) {
  return (
    <div className="border border-gray-200 rounded-2xl px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h2>
      <div>
        {section.items.map((item, i) => (
          <FAQAccordionItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
