import React from 'react';

interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, id, type, required = false }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium ">
        {label}{required && ' *'}
      </label>
      <input type={type} id={id} name={id} required={required} className="bg-zinc-700 w-full mt-1 p-2 rounded border border-zinc-600" />
    </div>
  );
};

export default FormField;
