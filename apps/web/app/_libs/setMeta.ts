import { type Metadata } from 'next';

import type { OpenGraphType, SiteMetadata } from '@/_entities/common/common.types';
import { webConfig } from '@/config';

export const setMeta = (meta: SiteMetadata): Metadata => {
  const siteDescription = meta.description || webConfig.description;
  const siteKeywords = meta.keywords
    ? `${webConfig.keywords}, ${meta.keywords}`
    : webConfig.keywords;
  const siteUrl = `${webConfig.url}${meta.url}`;
  const siteImageLink = meta.imageLink
    ? `${webConfig.url}${meta.imageLink}`
    : `${webConfig.url}${webConfig.cover.link}`;
  const siteImageAlt = meta.imageAlt || webConfig.cover.alt;
  const siteType = meta.type || (webConfig.type as OpenGraphType);

  return {
    metadataBase: new URL(webConfig.url),
    title: meta.title,
    description: siteDescription,
    keywords: siteKeywords,
    robots: meta.robots || 'index, follow',
    authors: {
      name: webConfig.author.name,
      url: webConfig.author.url,
    },
    openGraph: {
      title: meta.title,
      description: siteDescription,
      locale: 'ko_KR',
      type: siteType,
      siteName: webConfig.title,
      url: siteUrl,
      images: [
        {
          url: siteImageLink,
          width: 1920,
          height: 1080,
          alt: siteImageAlt,
        },
      ],
    },
    alternates: {
      canonical: siteUrl,
    },
    other: {
      'google-site-verification': webConfig.googleVerfi,
      'version': webConfig.version,
    },
  };
};
