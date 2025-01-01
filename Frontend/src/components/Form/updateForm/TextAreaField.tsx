import React from "react";

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
}

// Gunakan React.forwardRef untuk menangani ref
const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ id, label, error, ...props }, ref) => {
    return (
      <div className="mb-6">
        <label htmlFor={id} className="block text-lg font-semibold text-gray-700">
          {label}
        </label>
        <textarea
          ref={ref} // Teruskan ref ke elemen <textarea>
          id={id}
          className={`w-full p-4 border rounded-lg text-gray-800 shadow-md focus:ring-2 focus:ring-indigo-500 ${
            error ? "border-red-500" : ""
          }`}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

TextAreaField.displayName = "TextAreaField"; // Tambahkan displayName untuk debugging
export default TextAreaField;
