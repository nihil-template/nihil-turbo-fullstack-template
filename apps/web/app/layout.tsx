import { GoogleAnalytics } from '@next/third-parties/google';
import { type Metadata } from 'next';
import Script from 'next/script';
import React from 'react';

import { Providers } from './_layouts';
import { webConfig } from './config';
import '@/_styles/tailwind.css';

export const metadata: Metadata = {
  metadataBase: new URL(webConfig.url),
  title: {
    template: `%s - ${webConfig.title}`,
    default: webConfig.title,
  },
  description: webConfig.description,
  keywords: webConfig.keywords,
  authors: {
    name: webConfig.author.name,
    url: webConfig.author.url,
  },
  generator: 'Jetbrains Webstorm',
  openGraph: {
    title: 'home',
    description: webConfig.description,
    locale: 'ko_KR',
    type: 'website',
    siteName: webConfig.title,
    url: webConfig.url,
    images: [
      {
        url: `${webConfig.url}/opengraph-image.png`,
        width: 1920,
        height: 1080,
        alt: 'site image',
      },
      {
        url: `${webConfig.url}/twitter-image.png`,
        width: 1920,
        height: 1080,
        alt: 'twitter site image',
      },
    ],
  },
  alternates: {
    canonical: webConfig.url,
  },
  other: {
    'google-site-verification': webConfig.googleVerfi,
    'version': webConfig.version,
  },
};

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children, }: Props) {
  return (
    <html lang='ko'>
      <head>
        {webConfig.googleAdSrc && (
          <Script async src={webConfig.googleAdSrc} crossOrigin='anonymous' />
        )}
        {webConfig.googleAnalyticsId && (
          <GoogleAnalytics gaId={webConfig.googleAnalyticsId} />
        )}
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
