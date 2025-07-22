import { useEffect, useState } from 'react';

interface ImagePreloaderProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  fallback?: string;
}

export const ImagePreloader: React.FC<ImagePreloaderProps> = ({
  src,
  alt,
  className = '',
  placeholder = '/logo.png', // Default placeholder
  fallback = '.png', // Default fallback
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setImageSrc(placeholder);

    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      setImageSrc(fallback);
      setIsLoaded(true);
    };
    
    img.src = src;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, placeholder, fallback]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${className} ${!isLoaded ? 'animate-pulse bg-gray-200' : ''}`}
      loading="lazy"
      decoding="async"
      style={{
        transition: 'opacity 0.3s ease-in-out',
        opacity: isLoaded ? 1 : 0.7,
      }}
    />
  );
};
