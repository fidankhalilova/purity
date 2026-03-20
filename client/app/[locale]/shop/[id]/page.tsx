import { getProductById, getAllProductIds } from "@/data/product";
import ProductDetailTemplate from "@/templates/ProductDetailTemplate";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export function generateStaticParams() {
  const locales = ["en", "az", "ru"];
  return locales.flatMap((locale) =>
    getAllProductIds().map((id) => ({ locale, id })),
  );
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();
  return <ProductDetailTemplate product={product} />;
}
