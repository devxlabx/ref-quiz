import React from 'react';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, disabled, ...rest }) => {
  const isDisabled = disabled
    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
    : 'bg-transparent text-primary';

  const buttonClasses = `
    flex justify-center items-center rounded-full min-h-[35px] outline outline-1 outline-white-500 px-4 py-2 text-center
    w-[100%] font-normal text-sm  hover:bg-primary hover:text-white
    ${isDisabled} active:scale-95 transition-transform transition-colors
  `;

  return (
    <button className={buttonClasses} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
