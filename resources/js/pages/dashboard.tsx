import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, List, MessageSquare, ArrowUpRight, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type DashboardStats = {
    total_products: number;
    total_categories: number;
    total_messages: number;
    recent_products: Array<{
        id: number;
        name: string;
        price: number;
        is_featured: boolean;
        created_at: string;
    }>;
    recent_messages: Array<{
        id: number;
        name: string;
        email: string;
        subject: string;
        created_at: string;
    }>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
];

export default function Dashboard() {
    const { props } = usePage();
    const stats = props.stats as DashboardStats;

    const statsData = [
        {
            title: 'Total Products',
            value: stats.total_products,
            icon: Package,
            link: '/admin/products',
            description: 'Manage your products',
        },
        {
            title: 'Categories',
            value: stats.total_categories,
            icon: List,
            link: '/admin/categories',
            description: 'View all categories',
        },
        {
            title: 'Messages',
            value: stats.total_messages,
            icon: MessageSquare,
            link: '/admin/contact-messages',
            description: 'View customer messages',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Stats Overview */}
                <div className="grid gap-4 md:grid-cols-3">
                    {statsData.map((stat, index) => (
                        <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <Link
                                    href={stat.link}
                                    className="mt-2 flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {stat.description}
                                    <ArrowUpRight className="ml-1 h-3 w-3" />
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Recent Products */}
                    <Card className="border-border/50">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent Products</CardTitle>
                                <CardDescription>Recently added products</CardDescription>
                            </div>
                            <Button asChild size="sm" variant="outline">
                                <Link href="/admin/products/create">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Product
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {stats.recent_products.length > 0 ? (
                                    stats.recent_products.map((product) => (
                                        <div key={product.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">{product.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    UGX {product.price.toLocaleString()}
                                                </p>
                                            </div>
                                            {product.is_featured && (
                                                <Badge variant="outline" className="ml-2">
                                                    Featured
                                                </Badge>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-muted-foreground py-4">
                                        No recent products
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Messages */}
                    <Card className="border-border/50">
                        <CardHeader>
                            <CardTitle>Recent Messages</CardTitle>
                            <CardDescription>Latest customer inquiries</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {stats.recent_messages.length > 0 ? (
                                    stats.recent_messages.map((message) => (
                                        <Link
                                            key={message.id}
                                            href={`/admin/contact-messages/${message.id}`}
                                            className="block rounded-lg p-3 hover:bg-accent transition-colors"
                                        >
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium">{message.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(message.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {message.subject || 'No subject'}
                                            </p>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-center text-muted-foreground py-4">
                                        No recent messages
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
