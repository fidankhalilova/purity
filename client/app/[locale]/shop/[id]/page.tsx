import { productService } from "@/services/productService";
import ProductDetailTemplate from "@/templates/ProductDetailTemplate";
import { notFound } from "next/navigation";
import { transformToProductDetail } from "@/utils/transformProduct";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateStaticParams() {
  try {
    const { products } = await productService.getAll(1, 100);
    const locales = ["en", "az", "ru"];

    return locales.flatMap((locale) =>
      products.map((product) => ({
        locale,
        id: (product as any).id || product._id,
      })),
    );
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { id, locale } = await params;

  try {
    // Use getById which handles both ObjectId and slug
    const product = await productService.getById(id);

    if (!product) {
      notFound();
    }

    const productDetail = transformToProductDetail(product, locale);

    return <ProductDetailTemplate product={productDetail} />;
  } catch (error) {
    console.error("Error loading product:", error);
    notFound();
  }
}
