"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const ResponsiveImage = ({ 
    src, 
    alt, 
    aspectRatio = "16-9", // Options: '16-9', '4-3', '1-1', 'auto'
    objectFit = "cover",  // Options: 'cover', 'contain'
    className = "" 
}) => {
    const [isLoading, setIsLoading] = useState(true);

    // Provide a safe fallback if no image is provided
    const imageSrc = src || '/placeholder-image.jpg'; // Ensure you have a placeholder image in your public folder

    return (
        <div className={`aspect-ratio-${aspectRatio} bg-light overflow-hidden rounded ${className}`}>
            <Image
                src={imageSrc}
                alt={alt || "Website Image"}
                fill // Next.js prop to fill the parent wrapper
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`transition-opacity duration-300 ${
                    objectFit === 'cover' ? 'img-cover' : 'img-contain'
                } ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
                quality={85}
            />
            
            {/* Optional Loading Skeleton */}
            {isLoading && (
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light placeholder-glow">
                    <span className="placeholder w-100 h-100"></span>
                </div>
            )}
        </div>
    );
};

export default ResponsiveImage;