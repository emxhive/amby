import { Input } from '@/components/ui/input';
import React from 'react';

interface RenderInputFieldProps {
    id: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
    className?: string;
}

export default function RenderInputField({ id, name, value, onChange, placeholder, className }: RenderInputFieldProps) {
    return <Input id={id} name={name} value={value} onChange={onChange} placeholder={placeholder} className={className} />;
}
