import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ProductDetail } from "@/types/product";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function SimilarProducts({
  product,
}: {
  product: ProductDetail;
}) {
  const t = useTranslations("ProductDetail");
  const rows = [t("price"), t("ratings"), t("ingredient"), t("availability")];

  return (
    <section className="py-12 md:py-16 px-4 md:px-6">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-sm text-gray-400 mb-2">{t("compareWith")}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {t("similarProducts")}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-125">
            <thead>
              <tr>
                <td className="w-24 md:w-36 shrink-0" />
                {product.similarProducts.map((item, i) => (
                  <td key={i} className="text-center pb-4 px-2 md:px-3">
                    <Link href={item.href}>
                      <div className="relative aspect-square w-full max-w-28 md:max-w-36 mx-auto rounded-xl md:rounded-2xl overflow-hidden bg-[#f0ebe2]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-xs md:text-sm font-medium text-gray-900 mt-2 md:mt-3">
                        {item.name}
                      </p>
                    </Link>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={row} className="border-t border-gray-100">
                  <td className="py-3 md:py-4 text-xs md:text-sm font-semibold text-gray-700 pr-3 md:pr-4">
                    {row}
                  </td>
                  {product.similarProducts.map((item, i) => (
                    <td
                      key={i}
                      className="py-3 md:py-4 text-center px-2 md:px-3"
                    >
                      {ri === 0 && (
                        <span className="text-xs md:text-sm text-gray-700">
                          {item.price}
                        </span>
                      )}
                      {ri === 1 && (
                        <div className="flex flex-col items-center gap-1">
                          <Stars rating={item.rating} />
                          <span className="text-xs text-gray-500">
                            {item.rating}
                          </span>
                        </div>
                      )}
                      {ri === 2 && (
                        <span className="text-xs text-gray-600">
                          {item.ingredient}
                        </span>
                      )}
                      {ri === 3 && (
                        <div className="flex items-center justify-center gap-1">
                          <svg
                            className="w-3.5 h-3.5 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            viewBox="0 0 24 24"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span className="text-xs text-green-600 font-medium">
                            {t("inStockLabel")}
                          </span>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
