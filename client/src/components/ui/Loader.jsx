import React from 'react';

const Loader = ({ 
  size = 'md', 
  className = '', 
  fullScreen = false 
}) => {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const content = (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div 
        className={`
          animate-spin rounded-full border-primary border-t-transparent 
          ${sizes[size]}
        `} 
      />
      {fullScreen && <p className="text-sm font-semibold text-text-secondary animate-pulse">Initializing Dashboard...</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
