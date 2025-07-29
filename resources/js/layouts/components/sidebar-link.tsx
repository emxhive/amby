import { Link } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

interface SidebarLinkProps {
    label: string;
    icon: LucideIcon;
    route: string;
    active?: boolean;
    isCollapsed?: boolean;
}

export default function SidebarLink({ label, icon: Icon, route, active, isCollapsed = false }: SidebarLinkProps) {
    return (
        <Link
            href={route}
            className={`flex items-center ${isCollapsed ? 'justify-center' : ''} gap-3 rounded-sm px-3 py-2 text-sm font-medium transition ${
                active ? 'text-blue-600' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
            title={isCollapsed ? label : undefined}
        >
            <Icon className={`h-4 w-4 flex-shrink-0 ${active ? 'text-blue-600' : 'text-muted-foreground'}`} />
            {!isCollapsed && <span className="transition-opacity duration-300">{label}</span>}
        </Link>
    );
}
