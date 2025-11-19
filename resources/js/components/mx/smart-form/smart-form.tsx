import { ComponentType, FieldConfig, SmartFormProps, SubmitOptions } from '@/components/mx/smart-form/index';
import { useForm } from '@inertiajs/react';
import React from 'react';
import { RenderDate, RenderImage, RenderInput, RenderPhone, RenderSelect, RenderTextarea } from './fields';

const defaultComponents: Record<ComponentType, React.ComponentType<any>> = {
    text: RenderInput,
    select: RenderSelect,
    date: RenderDate,
    image: RenderImage,
    phone: RenderPhone,
    textarea: RenderTextarea,
};

export default function SmartForm({ fields, initialData, action, method = 'post', styles = {}, onSubmit, submitOptions = {} }: SmartFormProps) {
    const form = useForm(initialData);

    // merge default submit options with user overrides
    const finalOptions: SubmitOptions = {
        onSuccess: () => form.reset(),
        onError: (errors) => console.error(errors),
        ...submitOptions,
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            return onSubmit(form);
        }
        // call Inertia helper with merged options
        (form as any)[method](action, finalOptions);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {fields.map((field: FieldConfig) => {
                const wrapperClass = field.wrapperClassName ?? styles.fieldWrapper;
                const labelClass = field.labelClassName ?? styles.label;
                const inputClass = field.inputClassName ?? field.className ?? styles.input;
                const errorClass = field.errorClassName ?? styles.error;

                if (field.render) {
                    return (
                        <div key={field.name} className={wrapperClass}>
                            {field.render({ form, field })}
                            {form.errors[field.name] && <div className={errorClass}>{form.errors[field.name]}</div>}
                        </div>
                    );
                }

                const fieldType = (field.type ?? 'text') as ComponentType;
                const Component = field.component ?? (defaultComponents[fieldType] || defaultComponents.text);

                return (
                    <div key={field.name} className={wrapperClass}>
                        {field.label && (
                            <label htmlFor={field.name} className={labelClass}>
                                {field.label}
                            </label>
                        )}
                        <Component
                            {...field}
                            id={field.name}
                            name={field.name}
                            value={form.data[field.name] ?? ''}
                            onChange={(e: any) =>
                                field.type === 'image'
                                    ? form.setData(field.name, e.currentTarget.files?.[0] ?? null)
                                    : form.setData(field.name, e.currentTarget.value)
                            }
                            className={inputClass}
                        />
                        {form.errors[field.name] && <div className={errorClass}>{form.errors[field.name]}</div>}
                    </div>
                );
            })}

            <button type="submit" disabled={form.processing} className={styles.button}>
                {form.processing ? 'Loading…' : 'Submit'}
            </button>
        </form>
    );
}
