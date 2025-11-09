// app/[locale]/metadata.ts
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "SEO" });

  return {
    title: t("title"),
    description: t("description")
  };
}
