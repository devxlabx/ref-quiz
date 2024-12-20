import React from 'react';

const Icon: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const iconClasses = `
    flex 
    mr-2  /* Positionné à gauche par défaut */
  `;

  return <span className={iconClasses}>{children}</span>;
};

export default Icon;
