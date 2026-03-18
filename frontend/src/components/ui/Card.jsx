import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  ...props 
}) => {
  const variants = {
    default: 'bg-card border border-border shadow-card',
    secondary: 'bg-secondary text-white border border-secondary shadow-soft',
    ghost: 'bg-transparent border border-border/50 hover:bg-white/50 transition-colors duration-300',
    glass: 'bg-white/70 backdrop-blur-md border border-white/20 shadow-lg',
  };

  return (
    <div 
      className={`
        rounded-2xl p-6 relative overflow-hidden transition-all duration-300
        ${variants[variant]} ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
