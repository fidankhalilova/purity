import { getTranslations } from "next-intl/server";
import LoginTemplate from "@/templates/LoginTemplate";

type Props = { params: Promise<{ locale: string }> };

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  return <LoginTemplate />;
}
