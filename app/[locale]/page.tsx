import { Metadata } from 'next';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
// CORRECCIÓN: Importamos Link desde nuestro archivo local @/navigation
import { Link } from '@/navigation'; 

import { LinkButton } from '@/components/ui/LinkButton'
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Oso from '@/components/layout/Oso';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'SEO' });
  
  return {
    title: t('landing.title'),
    description: t('landing.description'),
    openGraph: {
      title: t('landing.title'),
      description: t('landing.description'),
      type: 'website',
      locale: locale,
      siteName: 'GoH2',
      url: 'https://goh2.vercel.app'
    }
  };
}


export default function LandingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  
  const t = useTranslations('Landing');

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      <div className="flex flex-col md:flex-row min-h-screen items-center justify-center px-8 pt-24 pb-24">
        
        <div className="flex-1 flex items-center justify-center w-full md:w-1/2 p-10">
          <div className="w-64 h-64 md:w-96 md:h-96">
             <Oso />
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center md:items-start justify-center w-full md:w-1/2 p-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-10 text-center md:text-left max-w-lg">
            {t.rich('slogan', {
              primary: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h1>
          
          <div className="w-full max-w-xs space-y-4">
            <LinkButton href="/registro" variant="primary">
              {t("ctaPrimary")}
            </LinkButton>

            <LinkButton href="/login" variant="secondary">
              {t("ctaSecondary")}
            </LinkButton>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}