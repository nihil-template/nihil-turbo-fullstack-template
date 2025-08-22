'use client';

import React from 'react';

import { DataTable } from '@/(common)/_components/ui/data-table';
import { useGetUsers } from '@/_entities/users/hooks';

import { columns } from './columns';

export function UserList() {
  const { users, loading, error, } = useGetUsers(
    { page: 1, limit: 10, },
    undefined
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !users) {
    return <div>Error fetching users.</div>;
  }

  return (
    <DataTable
      columns={columns}
      data={users}
      filterKey='emlAddr'
    />
  );
}
