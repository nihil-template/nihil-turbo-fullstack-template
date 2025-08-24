'use client';

import { PaginationState } from '@tanstack/react-table';
import React from 'react';

import { DataTable } from '@/(common)/_components/ui/data-table';
import { useGetUsers } from '@/_entities/users/hooks';

import { columns } from './columns';

export function UserList() {
  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

  const { users, total, loading, error } = useGetUsers(
    { page: pageIndex + 1, limit: pageSize },
    {
      keepPreviousData: true,
    }
  );

  const pageCount = total ? Math.ceil(total / pageSize) : 0;

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
      pageCount={pageCount}
      pagination={{ pageIndex, pageSize }}
      onPaginationChange={setPagination}
    />
  );
}
