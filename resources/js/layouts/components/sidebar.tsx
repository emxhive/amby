import { sidebarSections } from '@/layouts/lib/sidebar-data';
import { usePage } from '@inertiajs/react';
import SidebarLink from './sidebar-link';

interface SidebarProps {
    isOpen?: boolean;
}

export default function Sidebar({ isOpen = true }: SidebarProps) {
    const { auth } = usePage().props as unknown as {
        auth: {
            user: {
                name: string;
                role: string;
                avatar?: string;
            };
        };
    };

    const currentRouteName = route().current();

    return (
        <aside
            className={`flex h-screen flex-col border-r border-border bg-background p-4 transition-all duration-300 ease-in-out ${
                isOpen ? 'w-64' : 'w-20'
            }`}
        >
            {/* Logo/top */}
            <div className="mb-8 flex h-12 shrink-0 items-center px-2">
                <span
                    className={`text-lg font-bold tracking-wide text-blue-600 transition-opacity duration-300 ${
                        isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    Amby
                </span>
            </div>
            {/* Scrollable nav */}
            <nav className="mb-4 flex-1 space-y-6 overflow-x-hidden overflow-y-auto">
                {sidebarSections.map((section, idx) => (
                    <div key={idx}>
                        {section.heading && (
                            <div
                                className={`mb-3 ml-2 text-sm font-semibold text-muted-foreground transition-opacity duration-300 ${
                                    isOpen ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                {section.heading}
                            </div>
                        )}
                        <div className="flex flex-col gap-1">
                            {section.links.map((item) => (
                                <SidebarLink
                                    key={item.label}
                                    label={item.label}
                                    icon={item.icon}
                                    route={route(item.route)}
                                    active={sameResource(item.route, currentRouteName as string) || item.route === currentRouteName}
                                    isCollapsed={!isOpen}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
            {/* User profile (sticky bottom) */}
            <div className={`flex shrink-0 items-center gap-3 border-border ${isOpen ? '' : 'justify-center'}`}>
                <img
                    src={auth?.user?.avatar || 'https://api.dicebear.com/8.x/adventurer/svg?seed=A'}
                    alt="Avatar"
                    className="h-10 w-10 rounded-full border-2 border-border"
                />
                {isOpen && (
                    <div>
                        <div className="text-sm font-semibold text-foreground">{auth?.user?.name || 'Admin'}</div>
                        <div className="text-xs text-muted-foreground capitalize">{auth?.user?.role || 'Super admin'}</div>
                    </div>
                )}
            </div>
        </aside>
    );
}

function sameResource(a: string, b: string) {
    const pa = a.split('.');
    const pb = b.split('.');
    return pa[0] === 'admin' && pb[0] === 'admin' && pa[1] === pb[1];
}
