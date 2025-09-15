import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';

export default function UsersCreate() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Users', href: '/admin/users' },
    { title: 'Create', href: '/admin/users/create' },
  ];

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setData({
      ...data,
      name,
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setData({
      ...data,
      email,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    
    post('/admin/users', {
      forceFormData: true,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create User" />
      <div className="container px-4 py-6 sm:py-8 mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Create User</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <Label htmlFor="name">User Name*</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={handleNameChange}
                    placeholder="Enter user name"
                    required
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    value={data.email}
                    onChange={handleEmailChange}
                    placeholder="Enter user email"
                    required
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <Label htmlFor="password">Password*</Label>
                  <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder="Enter user password"
                    required
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4">
                <Link href="/admin/users" className="w-full sm:w-auto">
                  <Button variant="outline" type="button" className="w-full">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                  {processing ? 'Creating...' : 'Create User'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}