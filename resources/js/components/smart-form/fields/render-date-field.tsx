import React from 'react';
import { Input } from '@/components/ui/input';

interface RenderDateFieldProps {
    id: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    className?: string;
}

export default function RenderDateField({ id, name, value, onChange, className }: RenderDateFieldProps) {
    return <Input type="date" id={id} name={name} value={value} onChange={onChange} className={className} />;
}
