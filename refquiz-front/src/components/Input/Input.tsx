import React from 'react';
import './Input.css';


interface InputFieldProps extends React.InputHTMLAttributes<any>{
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder = '',
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
