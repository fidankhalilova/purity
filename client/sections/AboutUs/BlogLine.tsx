import Image from "next/image";
import Link from "next/link";

type FeatureCard = {
  title: string;
  description: string;
  image: string;
  hoverImage?: string;
  href?: string;
};

const cards: FeatureCard[] = [
  {
    title: "Sustainable by Design",
    description:
      "Designed with sustainability in mind, using clean formulas, ethical sourcing, and recyclable packaging to care for both skin and planet.",
    image:
      "https://purity.nextsky.co/cdn/shop/files/about-us-multi-3.jpg?v=1745911038&width=1100",
    href: "#",
  },
  {
    title: "Universal Adaptability",
    description:
      "Developed to work across all skin types, delivering targeted care that adapts, protects, and promotes visible balance and healthy radiance.",
    image:
      "https://purity.nextsky.co/cdn/shop/files/about-us-multi-3.jpg?v=1745911038&width=1100",
    href: "#",
  },
  {
    title: "Ultra Gentle Care",
    description:
      "Formulated to be clean and ultra gentle, rebalancing the skin barrier, soothing, hydrating, and revitalizing all skin types with lasting comfort.",
    image:
      "https://purity.nextsky.co/cdn/shop/files/about-us-multi-3.jpg?v=1745911038&width=1100",
    href: "#",
  },
];

function FeatureCard({ card }: { card: FeatureCard }) {
  const Wrapper = card.href ? Link : "div";

  return (
    <Wrapper href={card.href ?? "#"} className="group flex flex-col gap-4">
      {/* Image */}
      <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-gray-100">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          {card.description}
        </p>
      </div>
    </Wrapper>
  );
}

export default function BlogLine() {
  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <p className="text-sm text-gray-400 tracking-wide mb-2">
          Where Trust Begins
        </p>
        <h2 className="text-4xl font-bold text-gray-900">
          Built to Earn Your Trust
        </h2>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card) => (
          <FeatureCard key={card.title} card={card} />
        ))}
      </div>
    </div>
  );
}
