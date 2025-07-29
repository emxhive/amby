import { Textarea } from '@/components/ui/textarea';
import React from 'react';

interface RenderTextareaFieldProps {
    id: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
    placeholder?: string;
    className?: string;
}

export default function RenderTextareaField({ id, name, value, onChange, placeholder, className }: RenderTextareaFieldProps) {
    return <Textarea id={id} name={name} value={value} onChange={onChange} placeholder={placeholder} className={className} />;
}
