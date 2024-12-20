import React from 'react';

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
  onClick,  // Make sure to handle onClick prop
  label,
}) => (
  <div className="mb-4">
    <label className="block text-gray-300 mb-2">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full py-2 px-1 bg-transparent text-white  rounded focus:outline-none focus:bg-white focus:text-black transition-all"
      onChange={onChange}
      onClick={onClick}  // Attach onClick event to input
      required
    />
  </div>
);

export default InputField;
