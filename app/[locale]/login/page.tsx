import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import LoginContent from './LoginContent'; // Importamos tu componente

// === METADATA DINÁMICA (SEO) ===
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'SEO.login' });
  
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

export default function LoginPage({ params: { locale } }: { params: { locale: string } }) {
  // Habilitar optimizaciones estáticas
  setRequestLocale(locale);
  return <LoginContent />;
}