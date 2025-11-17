import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import RegisterContent from './RegisterContent'; // Importamos tu componente

// === METADATA DINÁMICA (SEO) ===
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'SEO.register' });
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
    },
  };
}

export default function RegisterPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <RegisterContent />;
}