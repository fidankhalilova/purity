import Image from "next/image";
import Link from "next/link";

type FeaturedPostProps = {
  category: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  href: string;
  viewDetailsLabel?: string;
};

export default function BlogCard_One({
  category,
  title,
  date,
  author,
  excerpt,
  image,
  href,
  viewDetailsLabel = "View Details",
}: FeaturedPostProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden">
      {/* Image */}
      <div className="relative aspect-4/3 md:aspect-auto min-h-64">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="bg-[#f2efe6] flex flex-col justify-center gap-5 px-8 md:px-10 py-10 md:py-12">
        <span className="self-start bg-[#c0392b] text-white text-sm font-medium px-4 py-1.5 rounded-full">
          {category}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {title}
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{date}</span>
          <span className="w-1 h-1 rounded-full bg-gray-400 inline-block" />
          <span>{author}</span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{excerpt}</p>
        <Link
          href={href}
          className="self-start px-10 py-3.5 bg-[#1f473e] text-white text-sm font-medium rounded-full hover:bg-[#163830] transition-colors duration-300"
        >
          {viewDetailsLabel}
        </Link>
      </div>
    </div>
  );
}
