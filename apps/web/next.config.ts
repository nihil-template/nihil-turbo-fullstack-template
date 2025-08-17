import { type NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: true,
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [ '@svgr/webpack', ],
        as: '*.js',
      },
    },
    resolveAlias: {
      '@': './app',
    },
  },
  pageExtensions: [ 'tsx', 'ts', ],
  distDir: 'build',
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  transpilePackages: [ '@repo/shadcn', ],
  eslint: {
    dirs: [],
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
