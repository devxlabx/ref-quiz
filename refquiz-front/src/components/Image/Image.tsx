import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, width, height, className }) => {
  const imageClasses = `
    flex
    mr-2
    ${className || ''}
  `;

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={imageClasses}
    />
  );
};

export default Image;