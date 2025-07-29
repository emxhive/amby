import { routes } from '@/lib/routes';
import {
    Home,
    ListOrdered,
    LucideIcon,
    MessageCircleQuestion,
    Newspaper,
    Shield,
    ShoppingCart,
    Star,
    Ticket,
    Users
} from 'lucide-react';

export interface SidebarLinkType {
    label: string;
    icon: LucideIcon;
    route: string;
}

export interface SidebarSection {
    heading?: string;
    links: SidebarLinkType[];
}

export const sidebarSections: SidebarSection[] = [
    {
        links: [
            {
                label: 'Dashboard',
                icon: Home,
                route: routes.admin.dashboard,
            },
            {
                label: 'Blogs',
                icon: Newspaper,
                route: routes.admin.base,
            },
        ],
    },
    {
        heading: 'Shop',
        links: [
            {
                label: 'Products',
                icon: ShoppingCart,
                route: routes.admin.products.index,
            },
            {
                label: 'Orders',
                icon: ListOrdered,
                route: routes.admin.orders.index,
            },

            {
                label: 'Reviews',
                icon: Star,
                route: routes.admin.base,
            },
            {
                label: 'Promotions',
                icon: Ticket,
                route: routes.admin.base,
            },
        ],
    },

    {
        heading: 'Advanced',
        links: [
            {
                label: 'Users',
                icon: Users,
                route: routes.admin.base,
            },
            {
                label: 'Admins',
                icon: Shield,
                route: routes.admin.base,
            },
            {
                label: 'Tickets',
                icon: MessageCircleQuestion,
                route: routes.admin.base,
            },
        ],
    },
];
