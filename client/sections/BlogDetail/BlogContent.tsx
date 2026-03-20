import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { BlogPost, ContentBlock } from "@/types/blog";

function renderBlock(block: ContentBlock, i: number, tipLabel: string) {
  switch (block.type) {
    case "intro":
      return (
        <p
          key={i}
          className="text-base font-bold text-gray-900 leading-relaxed"
        >
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2 key={i} className="text-2xl font-bold text-gray-900 mt-6">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} className="text-xl font-bold text-gray-900 mt-4">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="text-base text-gray-600 leading-relaxed">
          {block.text}
        </p>
      );
    case "tip":
      return (
        <p key={i} className="text-base text-gray-600 leading-relaxed">
          <span className="font-semibold text-gray-800">{tipLabel} </span>
          {block.text}
        </p>
      );
    case "image":
      return (
        <figure key={i} className="my-6">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
            <Image
              src={block.src}
              alt={block.alt ?? ""}
              fill
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="text-center text-xs text-gray-400 mt-2">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "link-p":
      return (
        <p key={i} className="text-base text-gray-600 leading-relaxed">
          {block.parts.map((part, j) =>
            part.href ? (
              <a
                key={j}
                href={part.href}
                className="font-bold underline text-gray-900"
              >
                {part.text}
              </a>
            ) : part.bold ? (
              <strong key={j} className="font-bold text-gray-900">
                {part.text}
              </strong>
            ) : (
              <span key={j}>{part.text}</span>
            ),
          )}
        </p>
      );
    default:
      return null;
  }
}

export default async function BlogContent({ post }: { post: BlogPost }) {
  const t = await getTranslations("BlogDetail");

  return (
    <article className="max-w-3xl mx-auto py-8 px-4 md:px-0">
      <span className="inline-block bg-[#c0392b] text-white text-xs font-medium px-4 py-1.5 rounded-full mb-4">
        {post.category}
      </span>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
        {post.title}
      </h1>
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-8">
        <span>{post.date}</span>
        <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />
        <span>{post.author}</span>
        <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />
        <span>
          {post.comments ?? 0} {t("comments")}
        </span>
      </div>
      <div className="flex flex-col gap-5">
        {post.blocks.map((block, i) => renderBlock(block, i, t("tip")))}
      </div>
    </article>
  );
}
