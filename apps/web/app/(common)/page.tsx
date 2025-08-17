import React from 'react';

import { Home } from '@/(common)/_components/Home';
import { setMeta } from '@/_libs/setMeta';

export const metadata = setMeta({
  title: '메인',
});

export default function Page() {
  return <Home />;
}
