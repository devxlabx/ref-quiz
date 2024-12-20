import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string; // Vous pouvez ajouter une classe supplémentaire si besoin
}

const Card: React.FC<CardProps> = ({ children, className }) => (
  <div
    className={`bg-gray-950 m-10 p-8 rounded-lg shadow-lg flex flex-col justify-center ${className}`}
  >
    {children}
  </div>
);

export default Card;
