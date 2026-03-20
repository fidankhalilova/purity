"use client";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

type BlogCardProps = {
  category: string;
  title: string;
  date: string;
  author: string;
  image: string;
  href: string;
};

export default function BlogCard({
  category,
  title,
  date,
  author,
  image,
  href,
}: BlogCardProps) {
  const locale = useLocale();
  const fullHref = href.startsWith("/") ? href : `/${locale}/blog/${href}`;

  return (
    <Link href={fullHref} className="group flex flex-col gap-4">
      <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="self-start bg-[#c0392b] text-white text-xs font-medium px-3 py-1 rounded-full">
          {category}
        </span>
        <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:underline">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>{date}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />
          <span>{author}</span>
        </div>
      </div>
    </Link>
  );
}
