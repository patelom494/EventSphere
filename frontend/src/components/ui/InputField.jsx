import React from 'react';

const InputField = ({ 
  label, 
  error, 
  icon: Icon, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="text-sm font-semibold text-text-primary ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors duration-200">
            <Icon size={18} strokeWidth={2.5} />
          </div>
        )}
        <input
          className={`
            w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary 
            placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 
            focus:border-primary transition-all duration-200
            ${Icon ? 'pl-11' : ''}
            ${error ? 'border-red-500 ring-red-500/10' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 font-medium ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
