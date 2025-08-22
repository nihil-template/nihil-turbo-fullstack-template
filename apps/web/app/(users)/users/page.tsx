import { UserList } from './_components/UserList';

export default function UsersPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <UserList />
    </div>
  );
}
