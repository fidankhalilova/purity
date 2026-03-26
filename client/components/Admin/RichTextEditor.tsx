// components/Admin/RichTextEditor.tsx
"use client";
import { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  Quote,
  Image as ImageIcon,
  Link2,
} from "lucide-react";
import { uploadService } from "@/services/uploadService";
import { toast } from "react-hot-toast";
import { ContentBlock } from "@/types/blog";

interface RichTextEditorProps {
  value: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addBlock = (type: ContentBlock["type"]) => {
    let newBlock: ContentBlock = { type, order: value.length };

    if (type === "image") {
      fileInputRef.current?.click();
      return;
    }

    if (type === "h1") newBlock.text = "Heading 1";
    else if (type === "h2") newBlock.text = "Heading 2";
    else if (type === "h3") newBlock.text = "Heading 3";
    else if (type === "p") newBlock.text = "Start writing...";
    else if (type === "intro") newBlock.text = "Introduction text...";
    else if (type === "tip") newBlock.text = "Pro tip: ...";
    else if (type === "quote") newBlock.text = "Quote text...";
    else if (type === "list") newBlock.items = ["Item 1", "Item 2"];
    else if (type === "link-p")
      newBlock.parts = [{ text: "Click here", href: "#" }];

    onChange([...value, newBlock]);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadService.uploadBlogImage(file);

      const newBlock: ContentBlock = {
        type: "image",
        src: url,
        alt: "Blog image",
        caption: "",
        order: value.length,
      };

      onChange([...value, newBlock]);
      toast.success("Image uploaded");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const updateBlock = (index: number, updates: Partial<ContentBlock>) => {
    const newBlocks = [...value];
    newBlocks[index] = { ...newBlocks[index], ...updates };
    onChange(newBlocks);
  };

  const removeBlock = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === value.length - 1) return;

    const newBlocks = [...value];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[direction === "up" ? index - 1 : index + 1];
    newBlocks[direction === "up" ? index - 1 : index + 1] = temp;

    // Update order
    newBlocks.forEach((block, i) => {
      block.order = i;
    });
    onChange(newBlocks);
  };

  const renderBlockEditor = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "h1":
      case "h2":
      case "h3":
      case "p":
      case "intro":
      case "tip":
      case "quote":
        return (
          <textarea
            value={block.text || ""}
            onChange={(e) => updateBlock(index, { text: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:border-[#1f473e] focus:outline-none resize-none"
            rows={3}
            placeholder={`Enter ${block.type} content...`}
          />
        );

      case "image":
        return (
          <div className="space-y-3">
            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100">
              {block.src && (
                <img
                  src={block.src}
                  alt={block.alt}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <input
              type="text"
              value={block.alt || ""}
              onChange={(e) => updateBlock(index, { alt: e.target.value })}
              placeholder="Image alt text"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm"
            />
            <input
              type="text"
              value={block.caption || ""}
              onChange={(e) => updateBlock(index, { caption: e.target.value })}
              placeholder="Image caption (optional)"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm"
            />
          </div>
        );

      case "list":
        return (
          <div className="space-y-2">
            {(block.items || []).map((item, itemIndex) => (
              <div key={itemIndex} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...(block.items || [])];
                    newItems[itemIndex] = e.target.value;
                    updateBlock(index, { items: newItems });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm"
                  placeholder={`List item ${itemIndex + 1}`}
                />
                <button
                  onClick={() => {
                    const newItems = (block.items || []).filter(
                      (_, i) => i !== itemIndex,
                    );
                    updateBlock(index, { items: newItems });
                  }}
                  className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newItems = [
                  ...(block.items || []),
                  `Item ${(block.items?.length || 0) + 1}`,
                ];
                updateBlock(index, { items: newItems });
              }}
              className="text-sm text-[#1f473e] hover:underline"
            >
              + Add item
            </button>
          </div>
        );

      case "link-p":
        return (
          <div className="space-y-2">
            {(block.parts || []).map((part, partIndex) => (
              <div key={partIndex} className="flex gap-2">
                <input
                  type="text"
                  value={part.text}
                  onChange={(e) => {
                    const newParts = [...(block.parts || [])];
                    newParts[partIndex] = {
                      ...newParts[partIndex],
                      text: e.target.value,
                    };
                    updateBlock(index, { parts: newParts });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm"
                  placeholder="Link text"
                />
                <input
                  type="text"
                  value={part.href || ""}
                  onChange={(e) => {
                    const newParts = [...(block.parts || [])];
                    newParts[partIndex] = {
                      ...newParts[partIndex],
                      href: e.target.value,
                    };
                    updateBlock(index, { parts: newParts });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm"
                  placeholder="URL"
                />
                <button
                  onClick={() => {
                    const newParts = (block.parts || []).filter(
                      (_, i) => i !== partIndex,
                    );
                    updateBlock(index, { parts: newParts });
                  }}
                  className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newParts = [
                  ...(block.parts || []),
                  { text: "New link", href: "#" },
                ];
                updateBlock(index, { parts: newParts });
              }}
              className="text-sm text-[#1f473e] hover:underline"
            >
              + Add link
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-2xl">
        <button
          onClick={() => addBlock("h2")}
          className="p-2 hover:bg-white rounded-lg transition-colors"
          title="Heading"
        >
          <Heading2 size={18} />
        </button>
        <button
          onClick={() => addBlock("h3")}
          className="p-2 hover:bg-white rounded-lg transition-colors"
          title="Subheading"
        >
          <Heading3 size={18} />
        </button>
        <button
          onClick={() => addBlock("p")}
          className="p-2 hover:bg-white rounded-lg transition-colors"
          title="Paragraph"
        >
          <span className="text-sm font-medium">P</span>
        </button>
        <button
          onClick={() => addBlock("intro")}
          className="p-2 hover:bg-white rounded-lg transition-colors"
          title="Introduction"
        >
          <span className="text-sm font-medium">Intro</span>
        </button>
        <button
          onClick={() => addBlock("tip")}
          className="p-2 hover:bg-white rounded-lg transition-colors"
          title="Tip"
        >
          <span className="text-sm font-medium">Tip</span>
        </button>
        <button
          onClick={() => addBlock("quote")}
          className="p-2 hover:bg-white rounded-lg transition-colors"
          title="Quote"
        >
          <Quote size={18} />
        </button>
        <button
          onClick={() => addBlock("list")}
          className="p-2 hover:bg-white rounded-lg transition-colors"
          title="List"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => addBlock("link-p")}
          className="p-2 hover:bg-white rounded-lg transition-colors"
          title="Link paragraph"
        >
          <Link2 size={18} />
        </button>
        <button
          onClick={() => addBlock("image")}
          className="p-2 hover:bg-white rounded-lg transition-colors"
          title="Image"
        >
          <ImageIcon size={18} />
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {uploading && (
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-[#1f473e] rounded-full animate-spin" />
            Uploading image...
          </div>
        </div>
      )}

      {/* Content Blocks */}
      <div className="space-y-4">
        {value.map((block, index) => (
          <div
            key={index}
            className={`border rounded-2xl p-4 transition-all ${selectedBlock === index ? "border-[#1f473e] shadow-md" : "border-gray-200"}`}
            onClick={() => setSelectedBlock(index)}
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {block.type}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => moveBlock(index, "up")}
                  className="p-1 hover:bg-gray-100 rounded"
                  disabled={index === 0}
                >
                  ↑
                </button>
                <button
                  onClick={() => moveBlock(index, "down")}
                  className="p-1 hover:bg-gray-100 rounded"
                  disabled={index === value.length - 1}
                >
                  ↓
                </button>
                <button
                  onClick={() => removeBlock(index)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  ✕
                </button>
              </div>
            </div>
            {renderBlockEditor(block, index)}
          </div>
        ))}
      </div>

      {value.length === 0 && (
        <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
          Click any button above to add content
        </div>
      )}
    </div>
  );
}
