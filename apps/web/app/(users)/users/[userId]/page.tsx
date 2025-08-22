'use client';

import { useGetUser } from '@/_entities/users/hooks';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/(common)/_components/ui/card';

export default function UserPage({ params }: { params: { userId: string } }) {
  const { data: user, isLoading, isError } = useGetUser(params.userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user) {
    return <div>Error fetching user data.</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>{user.userNm}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Email: {user.emlAddr}</p>
        </CardContent>
      </Card>
    </div>
  );
}
