import AdminSectionTemplate from "@/templates/AdminSectionTemplate";

type Props = { params: Promise<{ section: string }> };

export default async function AdminSection({ params }: Props) {
  const { section } = await params;
  return <AdminSectionTemplate section={section} />;
}
