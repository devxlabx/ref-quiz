import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'; 
  size?: 'small' | 'medium' | 'large'; 
}

const Button: React.FC<ButtonProps> = ({ 
  children,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  ...rest }) => {
  const buttonClasses = `buttonContainer  ${variant} ${size} ${disabled ? 'buttonDisabled' : ''}`;

  return (
    <button className={buttonClasses} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;