import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function AuthLayout({ children, title }: PropsWithChildren<{ title?: string }>) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-secondary pt-6 sm:justify-center sm:pt-0 dark:bg-background">
            <Head title={title} />

            <div>
                <a href="/" className="flex items-center justify-center">
                    <div className="flex h-25 w-25 items-center justify-center rounded-full bg-primary">
                        <span className="text-5xl font-bold text-primary-foreground">A</span>
                    </div>
                </a>
            </div>

            <div className={cn('mt-10 w-full bg-background px-6 pt-4 pb-11 sm:max-w-md dark:bg-background', 'overflow-hidden shadow-md sm:rounded-lg')}>
                {children}
            </div>
        </div>
    );
}
