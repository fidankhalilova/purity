import Breadcrumb from "@/components/BreadCrumb";
import ContactForm from "@/sections/ContactUs/ContactForm";
import ContactInfo from "@/sections/ContactUs/ContactInfo";

export default function ContactUsTemplate() {
  return (
    <div className="container mx-auto px-6 py-4">
      <Breadcrumb />
      <div className="flex flex-col gap-6 sm:gap-12"></div>
      <ContactInfo />
      <ContactForm />
    </div>
  );
}
