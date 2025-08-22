'use client';

import { UserInfo } from '@repo/prisma';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/(common)/_components/ui/button';

export const columns: ColumnDef<UserInfo>[] = [
  {
    accessorKey: 'userId',
    header: 'ID',
  },
  {
    accessorKey: 'userNm',
    header: 'Name',
  },
  {
    accessorKey: 'emlAddr',
    header: 'Email',
  },
  {
    id: 'actions',
    cell: ({ row, }) => {
      const user = row.original;

      return (
        <Button asChild variant='ghost'>
          <Link href={`/users/${user.userId}`}>View</Link>
        </Button>
      );
    },
  },
];
