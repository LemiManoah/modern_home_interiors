'use client';

import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type BreadcrumbItem } from '@/types';
import { PageProps } from '@inertiajs/core';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  email_verified_at: string;
}

interface UsersIndexProps extends PageProps {
  users: {
    data: User[];
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  };
  filters: {
    search?: string;
  };
}

export default function UsersIndex() {
  const { users, filters } = usePage<UsersIndexProps>().props;
  const [search, setSearch] = React.useState(filters.search || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/admin/users', { search }, { preserveScroll: true });
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Users', href: '/admin/users' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />
      <div className="space-y-4 m-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h1 className="text-2xl font-bold">Users Management</h1>
          <form onSubmit={handleSearch} className="flex gap-2 items-center">
            <Input
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
            <Button type="submit" variant="outline">Search</Button>
            <Link href="/admin/users/create">
              <Button>+ Add User</Button>
            </Link>
          </form>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Email verified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.data.length ? (
                users.data.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.email_verified_at}</TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/users/${user.id}`}>View</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/users/${user.id}/edit`}>Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              if (confirm('Are you sure?')) {
                                router.delete(`/admin/users/${user.id}`);
                              }
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-wrap gap-2 justify-end">
          {users.links.map((link, i) =>
            link.url === null ? (
              <Button key={i} disabled variant="outline" size="sm">
                {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
              </Button>
            ) : (
              <Button
                key={i}
                variant={link.active ? 'default' : 'outline'}
                size="sm"
                onClick={() => router.visit(link.url!)}
              >
                {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
              </Button>
            )
          )}
        </div>
      </div>
    </AppLayout>
  );
}
