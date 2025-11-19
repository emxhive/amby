import { Input } from '@/components/ui/input';
import React from 'react';

interface RenderPhoneFieldProps {
    id: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
    className?: string;
}

export default function RenderPhoneField({ id, name, value, onChange, placeholder, className }: RenderPhoneFieldProps) {
    return <Input type="tel" id={id} name={name} value={value} onChange={onChange} placeholder={placeholder} className={className} />;
}
