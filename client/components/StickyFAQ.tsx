"use client";
import { useState } from "react";

export default function StickyFAQ() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  return (
    <div className="bg-[#f0ebe2] rounded-3xl px-8 py-10 flex flex-col items-center gap-6">
      <span className="bg-[#c0392b] text-white text-sm font-medium px-5 py-2 rounded-full">
        Contact Us
      </span>

      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Still Looking?
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Have a question? Email us—we'll help fast.
        </p>
      </div>

      <div className="w-full flex flex-col gap-3">
        <input
          type="text"
          placeholder="Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-5 py-4 rounded-2xl border-0 bg-white text-gray-700 placeholder-gray-400 text-sm outline-none focus:ring-1 focus:ring-gray-300 transition-all"
        />
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-5 py-4 rounded-2xl border-0 bg-white text-gray-700 placeholder-gray-400 text-sm outline-none focus:ring-1 focus:ring-gray-300 transition-all"
        />
        <textarea
          placeholder="Your comment *"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={5}
          className="w-full px-5 py-4 rounded-2xl border-0 bg-white text-gray-700 placeholder-gray-400 text-sm outline-none focus:ring-1 focus:ring-gray-300 transition-all resize-none"
        />
      </div>

      <button className="w-full bg-[#1f473e] text-white font-semibold py-4 rounded-full hover:bg-[#163830] transition-colors duration-300">
        Submit
      </button>
    </div>
  );
}
