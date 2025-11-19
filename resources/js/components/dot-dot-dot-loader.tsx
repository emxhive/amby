import React, { useEffect, useState } from 'react';

export function DotDotDotLoader({ interval = 500, maxDots = 3 }) {
    const [dots, setDots] = useState(1);

    useEffect(() => {
        const id = setInterval(() => {
            setDots((d) => (d % maxDots) + 1);
        }, interval);
        return () => clearInterval(id);
    }, [interval, maxDots]);

    return <span>{'.'.repeat(dots)}</span>;
}
