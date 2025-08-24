import { UserList } from './_components/UserList';
import { UserEmailSearch } from './_components/UserEmailSearch';

export default function UsersPage() {
  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      
      <UserEmailSearch />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">전체 사용자 목록</h2>
        <UserList />
      </div>
    </div>
  );
}
