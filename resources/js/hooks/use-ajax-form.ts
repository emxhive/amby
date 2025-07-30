import { HttpError, post } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';

// Generic type T is your data shape (formInit)
export function useAjaxForm<T extends Record<string, any>, TResult = any>(
    url: string,
    formInit: T,
    {
        onSuccess,
        transform,
    }: {
        onSuccess?: (result: TResult) => void;
        // Optional custom transform: (data, formInit) => FormData | object
        transform?: (data: T, formInit: T) => FormData | object;
    } = {},
) {
    const { data, setData, errors, setError, reset } = useForm<T>(formInit);
    const [processing, setProcessing] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError({} as any);
        setProcessing(true);

        // Use custom transform if supplied, otherwise default to FormData
        let submitData: FormData | object;
        if (transform) {
            submitData = transform(data, formInit);
        } else {
            submitData = new FormData();
            Object.keys(formInit).forEach((key) => {
                const k = key as keyof typeof formInit;
                if (data[k] !== null && data[k] !== undefined) {
                    // @ts-ignore
                    (submitData as FormData).append(k, data[k]);
                }
            });
        }

        try {
            const result = await post<typeof submitData, TResult>(url, submitData);
            onSuccess?.(result);
            reset();
        } catch (e) {
            if (e instanceof HttpError && e.status === 422 && e.body?.errors) {
                setError(e.body.errors);
            } else {
                // Optionally handle non-validation errors (e.g., show toast)
                console.error(e);
            }
        } finally {
            setProcessing(false);
        }
    }

    return {
        data,
        setData,
        errors,
        setError,
        reset,
        processing,
        handleSubmit,
    };
}
