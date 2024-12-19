// Error.tsx
import React from 'react';
import './Error.css';

interface ErrorProps {
  children: React.ReactNode;
  className?: string;
}

const Error: React.FC<ErrorProps> = ({ children, className }) => (
  <div className={`errorContainer ${className || ''}`}>
    {children}
  </div>
);

export default Error;