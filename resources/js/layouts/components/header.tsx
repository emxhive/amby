import { Bell, Menu, Search } from 'lucide-react';
import { ReactNode } from 'react';

interface HeaderProps {
    onSidebarToggle?: () => void;
    title?: string;
    children?: ReactNode;
}

export function Header({ onSidebarToggle, children, title }: HeaderProps) {
    return (
        <header className="border-border bg-background">
            <div className="flex h-16 items-center justify-between px-6">
                {/* Menu Button (Sidebar toggle) or Custom Children */}
                {children || (
                    <button className="mr-2 rounded-md p-2 text-muted-foreground hover:bg-secondary" onClick={onSidebarToggle}>
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Open sidebar</span>
                    </button>
                )}

                {title && <h1 className="text-2xl font-semibold text-primary">{title}</h1>}

                <div className="flex-1"></div>

                {/* Right: Quick links and actions */}
                <div className="flex items-center gap-6">
                    <div className="relative flex">
                        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
                            <Search className="h-4 w-4" />
                        </span>
                        <input
                            className="w-50 rounded-md border border-border bg-secondary/30 px-4 py-2 pl-10 text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:outline-none"
                            placeholder="Search actions…"
                            type="search"
                        />
                    </div>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                        Documentation
                    </a>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                        Report Bug
                    </a>
                    <button className="relative rounded-full p-2 text-muted-foreground hover:bg-secondary" aria-label="View notifications">
                        <Bell className="h-4 w-4" />
                        {/* Optionally add a notification badge */}
                        <span className="absolute top-1.5 right-1.5 h-1 w-1 rounded-full bg-red-500" />
                    </button>
                </div>
            </div>
        </header>
    );
}
