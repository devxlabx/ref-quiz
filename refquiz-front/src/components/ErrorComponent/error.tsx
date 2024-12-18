import React from 'react';

interface ErrorProps {
  children: React.ReactNode;
  className?: string; // Vous pouvez ajouter une classe supplémentaire si besoin
}

const Error: React.FC<ErrorProps> = ({ children, className }) => (
  <div
    className={`text-red-500 text-xs h-9 flex items-start leading-none ${className}`}
  >
    {children}
  </div>
);

export default Error;
