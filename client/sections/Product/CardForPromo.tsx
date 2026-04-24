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

export default function CardForPromo({
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
      <div className="relative w-full aspect-4/3 md:aspect-auto md:min-h-80 md:order-last">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="bg-[#f2efe6] flex flex-col justify-center gap-4 md:gap-5 px-6 md:px-10 py-8 md:py-12">
        <span className="self-start bg-[#c0392b] text-white text-xs md:text-sm font-medium px-4 py-1.5 rounded-full">
          {category}
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
          {title}
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <span>{date}</span>
          <span className="w-1 h-1 rounded-full bg-gray-400 inline-block" />
          <span>{author}</span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 md:line-clamp-none">
          {excerpt}
        </p>
        <Link
          href={href}
          className="self-start px-8 md:px-10 py-3 md:py-3.5 bg-[#1f473e] text-white text-sm font-medium rounded-full hover:bg-[#163830] transition-colors duration-300"
        >
          {viewDetailsLabel}
        </Link>
      </div>
    </div>
  );
}
