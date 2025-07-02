import React from 'react';
import { Search, ShoppingCartIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { pi } from '@/lib/utils';


interface NavItems {
  title: string;
  href: string;
}

const mainNav: NavItems[] = [
  { title: 'Home', href: '/' },
  { title: 'Shop', href: '/shop' },
  { title: 'Blog', href: '/blog' },
  { title: 'About', href: '/about' },
  { title: 'Support', href: '/support' },
];

const HeaderNav: React.FC = () => {
  return (
    <header className="flex items-center justify-between py-5 h-20">
      <img src={pi("logo.png")} className="h-full object-contain" alt="Amby Logo" />
      <nav className="flex gap-8 font-medium">
        {mainNav.map(({ title, href }) => (
          <Link
            key={title}
            href={href}
            className="transition-colors hover:text-ambyRed-500 text-sm font-bold"
          >
            {title}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <Search className="cursor-pointer" />
        <ShoppingCartIcon/>
      </div>
    </header>
  );
};

export default HeaderNav;
