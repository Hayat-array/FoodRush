'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({
    rating = 0,
    onRate,
    readonly = false,
    size = 'md'
}) {
    const [hover, setHover] = useState(0);
    const [selected, setSelected] = useState(rating);

    useEffect(() => {
        setSelected(rating);
    }, [rating]);

    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    };

    const handleClick = (star) => {
        if (!readonly) {
            setSelected(star);
            if (onRate) {
                onRate(star);
            }
        }
    };

    const displayRating = hover || selected;

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={readonly}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => !readonly && setHover(star)}
                    onMouseLeave={() => !readonly && setHover(0)}
                    className={`transition-all ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
                >
                    <Star
                        className={`${sizeClasses[size]} transition-colors ${displayRating >= star
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                            }`}
                    />
                </button>
            ))}
            {selected > 0 && (
                <span className="ml-2 text-sm font-medium text-gray-700">
                    {selected.toFixed(1)}
                </span>
            )}
        </div>
    );
}
