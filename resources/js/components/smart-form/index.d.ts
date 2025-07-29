import React from 'react';

type FieldConfig = {
    name: string;
    label?: string;
    type?: keyof typeof defaultComponents;
    options?: { value: any; label: string }[];
    placeholder?: string;
    component?: React.ComponentType<any>;
    render?: (props: { form: any; field: FieldConfig }) => React.ReactNode;
    // per-field style overrides:
    wrapperClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    errorClassName?: string;
    className?: string; // alias for inputClassName
    [key: string]: any;
};

type ComponentType = 'text' | 'select' | 'date' | 'image' | 'phone' | 'textarea';

type Styles = {
    form?: string;
    fieldWrapper?: string;
    label?: string;
    input?: string;
    error?: string;
    button?: string;
};

type SubmitOptions = {
    onSuccess?: (page: { props: any }) => void;
    onError?: (errors: any) => void;
    [key: string]: any;
};

type SmartFormProps = {
    fields: FieldConfig[];
    initialData: Record<string, any>;
    action: string;
    method?: 'post' | 'put' | 'patch' | 'delete';
    styles?: Styles;
    onSubmit?: (form: any) => void;
    submitOptions?: SubmitOptions;
};
