import { Header } from '@/layouts/components/header';
import Sidebar from '@/layouts/components/sidebar';
import { ReactNode, useState } from 'react';

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex max-h-dvh min-h-dvh">

            <Sidebar isOpen={isSidebarOpen} />
            <div className="flex flex-1 flex-col">
                <Header title={title} onSidebarToggle={toggleSidebar} />
                <main className="flex-1 overflow-y-auto p-8 pt-0 pb-20">{children}</main>
            </div>
        </div>
    );
}

const coolDark = 'bg-[#0f172a]';

const coolHeaderDark = 'border-[#232946] bg-[#10172b]';
