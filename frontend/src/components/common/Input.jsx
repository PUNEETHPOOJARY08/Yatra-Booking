import React, { forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(({
  label,
  type = 'text',
  error,
  className,
  inputClassName,
  fullWidth = false,
  required = false,
  icon,
  ...props
}, ref) => {
  const inputClasses = clsx(
    "block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
    error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300",
    icon ? "pl-10" : "",
    inputClassName
  );
  
  const containerClasses = clsx(
    "mb-4",
    fullWidth ? "w-full" : "",
    className
  );
  
  return (
    <div className={containerClasses}>
      {label && (
        <label className="block font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

export default Input;