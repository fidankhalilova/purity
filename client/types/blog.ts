export type BlockType =
  | "intro"
  | "h2"
  | "h3"
  | "p"
  | "tip"
  | "image"
  | "link-p";

export type ContentBlock =
  | { type: "intro"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "tip"; text: string }
  | { type: "image"; src: string; alt?: string; caption?: string }
  | {
      type: "link-p";
      parts: { text: string; href?: string; bold?: boolean }[];
    };

export type BlogPost = {
  id: string;
  category: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  comments?: number;
  blocks: ContentBlock[];
  older?: { title: string; href: string };
  newer?: { title: string; href: string };
};
