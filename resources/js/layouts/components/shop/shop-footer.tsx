import { HoverCombobox, Item } from '@/components/hover-combobox';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { DollarSign, Globe } from 'lucide-react';
import React from 'react';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaFacebook, FaFacebookMessenger, FaInstagram, FaWhatsapp, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { SiMastercard, SiPaypal, SiStripe, SiVisa } from 'react-icons/si';

const Title = ({ children }: { children: React.ReactNode }) => <h3 className="mb-5 text-[15px] font-extrabold text-zinc-900">{children}</h3>;

const Links = ({ links }: { links: LinkDef[] }) => (
    <ul className="space-y-2 text-[13px] text-zinc-600">
        {links.map((l) => (
            <li key={l.label}>
                <Link href={l.href ?? '#'} className="hover:text-ambyRed-600">
                    {l.label}
                </Link>
            </li>
        ))}
    </ul>
);

export function ShopFooter() {
    return (
        <footer className="mt-16 border-t border-zinc-200 bg-white text-sm text-zinc-700">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 md:grid-cols-5">
                {/* Column 1 */}
                <div className="flex flex-col gap-8">
                    {/* Payments */}
                    <div>
                        <Title>Payment</Title>
                        <div className="grid grid-cols-4 gap-4">
                            {PAYMENTS.map(({ Icon, title }) => (
                                <Icon key={title} title={title} className="h-5 w-5" />
                            ))}
                        </div>
                    </div>

                    {/* Socials */}
                    <div>
                        <Title>Community</Title>
                        <div className="grid grid-cols-4 gap-4">
                            {SOCIALS.map(({ Icon, title, href }) => (
                                <Link key={title} href={href ?? '#'} aria-label={title} title={title}>
                                    <Icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <CurrencyPicker items={CURRENCIES} value="usd" onChange={(code) => {}} />
                    <LanguagePicker items={LANGUAGES} value={'en'} onChange={(code) => {}} />
                </div>

                {/* Column 2 */}
                <div className="space-y-8">
                    {COL2_GROUPS.map((g) => (
                        <div key={g.title}>
                            <Title>{g.title}</Title>
                            <Links links={g.links} />
                        </div>
                    ))}
                </div>

                {/* Column 3 */}
                <div>
                    <Title>{COL3_GROUP.title}</Title>
                    <Links links={COL3_GROUP.links} />
                </div>

                {/* Column 4 */}
                <div>
                    <Title>{COL4_GROUP.title}</Title>
                    <Links links={COL4_GROUP.links} />
                </div>

                {/* Column 5 */}
                <div className="space-y-6">
                    <div>
                        <Title>{COL5_GROUP.title}</Title>
                        <Links links={COL5_GROUP.links} />
                    </div>

                    <div className="flex flex-row gap-4">
                        {CHATS.map(({ Icon, title, href }) => (
                            <Link key={title} href={href ?? '#'} aria-label={title} title={title}>
                                <Icon className="h-5 w-5" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-zinc-200 py-6 text-center text-xs text-zinc-500">
                © {new Date().getFullYear()} amby. All rights reserved.
            </div>
        </footer>
    );
}

export default ShopFooter;

const textStyle = cn('text-[13px] font-semibold hover:text-ambyRed-600 transition-colors duration-300');
const LanguagePicker = ({ value, onChange, items }: { value?: string; onChange?: (v: string) => void; items: Item[] }) => {
    return (
        <HoverCombobox
            className=""
            items={items}
            value={value}
            onChange={onChange}
            ariaLabel="Language"
            searchPlaceholder={'Search'}
            textClassName={textStyle}
            TriggerIcon={Globe}
        />
    );
};
const CurrencyPicker = ({ value, onChange, items }: { value?: string; onChange?: (v: string) => void; items: Item[] }) => {
    return (
        <HoverCombobox
            searchPlaceholder={'Search'}
            items={items}
            value={value}
            onChange={onChange}
            ariaLabel="Currency"
            textClassName={textStyle}
            iconClassName={cn('rounded-full border-1 border-zinc-300 p-[3px]')}
            TriggerIcon={DollarSign}
        />
    );
};

///
//CONSTANTS
///

// socials
const SOCIALS = [
    { Icon: FaXTwitter, title: 'X', href: '#' },
    { Icon: FaInstagram, title: 'Instagram', href: '#' },
    { Icon: FaFacebook, title: 'Facebook', href: '#' },
    { Icon: FaYoutube, title: 'YouTube', href: '#' },
    { Icon: FaTelegramPlane, title: 'Telegram', href: '#' },
    { Icon: FaWhatsapp, title: 'WhatsApp', href: '#' },
];

const CHATS = [
    { Icon: FaXTwitter, title: 'X ', href: 'javascript:void(0);' },
    { Icon: FaInstagram, title: 'Instagram', href: '#' },
    { Icon: FaWhatsapp, title: 'WhatsApp', href: '#' },
    { Icon: FaFacebookMessenger, title: 'Facebook Messenger', href: '#' },
];

// payments
const PAYMENTS = [
    { Icon: SiVisa, title: 'Visa' },
    { Icon: SiMastercard, title: 'Mastercard' },
    { Icon: SiStripe, title: 'Gateway A' },
    { Icon: SiPaypal, title: 'Gateway B' },
];

// languages
const LANGUAGES = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
];

// currencies
const CURRENCIES = [
    { value: 'usd', label: 'USD-$' },
    { value: 'ngn', label: 'NGN-₦' },
    { value: 'gbp', label: 'GBP-£' },
];

type LinkDef = { label: string; href?: string };
type GroupDef = { title: string; links: LinkDef[] };

const COL2_GROUPS: GroupDef[] = [
    {
        title: 'Shop',
        links: [
            { label: 'Products', href: route(routes.shop.products.index) },
            { label: 'Orders', href: route(routes.account.orders.index) },
            { label: 'Offers', href: '#' },
        ],
    },
];

const COL3_GROUP: GroupDef = {
    title: 'Explore',
    links: [
        { label: 'Blogs', href: '#' },
        { label: 'Recipes', href: '#' },
        { label: 'Customer Feedback', href: '#' },
    ],
};

const COL4_GROUP: GroupDef = {
    title: 'About',
    links: [
        { label: 'Company', href: '#' },
        { label: 'Announcements', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Local Stores', href: '#' },
        { label: 'Unsupported Countries', href: '#' },
        { label: 'Policies', href: '#' },
        { label: 'Advertise with Us', href: '#' },
        { label: 'Partner with Us', href: '#' },
    ],
};

const COL5_GROUP: GroupDef = {
    title: 'Support',
    links: [
        { label: 'Support Centre', href: '#' },
        { label: 'Contact Form', href: '#' },
        { label: 'Feedback & Suggestions', href: '#' },
        { label: 'Returns', href: '#' },
        { label: 'Shipping', href: '#' },
    ],
};
