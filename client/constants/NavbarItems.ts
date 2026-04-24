export type SubItem = {
  nameKey: string;
  href: string;
};

export type MenuItem = {
  nameKey: string;
  href: string;
  items?: SubItem[];
};

export const menuItems: MenuItem[] = [
  { nameKey: "home", href: "/" },
  {
    nameKey: "shop",
    href: "/shop",
    items: [
      { nameKey: "shopItems.allProducts", href: "/shop" },
      { nameKey: "shopItems.foundation", href: "/shop" },
      { nameKey: "shopItems.lipColor", href: "/shop" },
      { nameKey: "shopItems.eye", href: "/shop" },
      { nameKey: "shopItems.blushBronzer", href: "/shop" },
    ],
  },
  { nameKey: "aboutUs", href: "/about-us" },
  { nameKey: "blog", href: "/blog" },
  { nameKey: "contactUs", href: "/contact-us" },
  { nameKey: "faq", href: "/faq" },
];
