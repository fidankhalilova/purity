import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/BreadCrumb";
import StickyFAQ from "@/components/StickyFAQ";
import StickyLayout from "@/components/StickyLayout";
import OurBenefits from "@/sections/FAQ/OurBenefits";
import Questions from "@/sections/FAQ/Questions";

export default function FAQTemplate() {
  const t = useTranslations("FAQPage");
  const faqData = t.raw("Sections") as {
    title: string;
    items: { question: string; answer: string }[];
  }[];

  return (
    <div className="container mx-auto px-4 md:px-6 py-4">
      <Breadcrumb />
      <div className="flex flex-col gap-6 sm:gap-12">
        <StickyLayout sticky={<StickyFAQ />}>
          <div className="flex flex-col gap-6">
            {faqData.map((section) => (
              <Questions key={section.title} section={section} />
            ))}
          </div>
        </StickyLayout>
        <OurBenefits />
      </div>
    </div>
  );
}
