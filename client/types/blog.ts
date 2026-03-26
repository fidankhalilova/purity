// types/blog.ts
export type ContentBlock = {
  type:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "intro"
    | "tip"
    | "image"
    | "quote"
    | "list"
    | "link-p";
  text?: string;
  src?: string;
  alt?: string;
  caption?: string;
  items?: string[];
  parts?: {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    href?: string;
  }[];
  order?: number;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  featuredImage: string;
  excerpt: string;
  content: ContentBlock[];
  status: "draft" | "published";
  views: number;
  comments: number;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};
