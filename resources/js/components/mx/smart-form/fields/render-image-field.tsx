import React from 'react';

interface RenderImageFieldProps {
    id: string;
    name: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    className?: string;
}

export default function RenderImageField({ id, name, onChange, className }: RenderImageFieldProps) {
    return <input type="file" accept="image/*" id={id} name={name} onChange={onChange} className={className} />;
}
