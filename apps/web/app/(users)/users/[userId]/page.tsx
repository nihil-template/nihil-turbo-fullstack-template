import React from 'react';

import { UserDetail } from './_components/UserDetail';

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function UserPage({ params, }: Props) {
  const { userId, } = await params;

  return <UserDetail userId={userId} />;
}
