import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  error?: string;
  type?: string;
  required?: boolean;
  [key: string]: any; // For register and other props
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(({ id, label, error, ...props }, ref) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <input
        id={id}
        name={id}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${error ? 'border-red-500' : ''}`}
        ref={ref} // Forward the ref here
        {...props}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
});

InputField.displayName = "InputField"; // This is important to give a name to the component

export default InputField;
