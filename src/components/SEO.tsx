import { Helmet } from 'react-helmet-async';

type SEOProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

const SITE_URL = 'https://authorityengine.com.au';
const DEFAULT_IMAGE = 'https://authorityengine.com.au/logo.svg';

export default function SEO({ title, description, path, image, noIndex }: SEOProps) {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_IMAGE;
  const fullTitle = title.includes('Authority Engine') ? title : `${title} — Authority Engine`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Authority Engine" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
