import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { routes } from '@/lib/routes';
import { Link, usePage } from '@inertiajs/react';
import { User2 } from 'lucide-react';

export function AccountMenu() {
    const { auth } = usePage().props as any;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-10 rounded-lg px-3 hover:bg-transparent">
                    <div className="flex items-center gap-2">
                        <User2 className="size-5 scale-105 opacity-70" strokeWidth={1.5} />
                        <div className="text-left leading-tight">
                            <div className="text-[10px] tracking-wide uppercase opacity-70">Account</div>
                            <div className="text-xs font-medium">Hi, Ezekiel</div>
                        </div>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {!auth?.user ? (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={route(routes.auth.login)}>Sign in</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={route(routes.auth.register)}>Create account</Link>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={route(routes.account.orders.index)}>Orders</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={route(routes.account.addresses.index)}>Addresses</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={route(routes.auth.logout)} method="post">
                                Logout
                            </Link>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
