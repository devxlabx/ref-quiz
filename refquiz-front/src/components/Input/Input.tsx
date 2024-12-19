import React from 'react';
import './Input.css';


interface InputFieldProps {
  type: string;
  placeholder: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>; // Added onClick prop
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  onChange,
  onClick,  
  label,
}) => (
  <div className='inputFieldContainer'>
    <label className='inputFieldLabel'>{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className='inputFieldInput'
      onChange={onChange}
      onClick={onClick}  
      required
    />
  </div>
);

export default InputField;
