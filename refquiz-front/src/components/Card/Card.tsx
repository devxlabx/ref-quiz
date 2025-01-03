import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={`cardContainer ${className || ''}`}>
    {children}
  </div>
);

export default Card;