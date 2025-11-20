import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 flex items-center justify-center gap-2 active:scale-95 relative overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white focus:ring-indigo-300 shadow-lg hover:shadow-2xl hover:scale-105',
    secondary: 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white focus:ring-gray-300 shadow-lg hover:shadow-xl hover:scale-105',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white focus:ring-green-300 shadow-lg hover:shadow-xl hover:scale-105',
    danger: 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white focus:ring-red-300 shadow-lg hover:shadow-xl hover:scale-105',
    warning: 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white focus:ring-orange-300 shadow-lg hover:shadow-xl hover:scale-105',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent focus:ring-indigo-300 hover:shadow-lg hover:scale-105',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-200 hover:scale-105',
    gradient: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white focus:ring-purple-300 shadow-lg hover:shadow-2xl hover:scale-105'
  };
  
  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none';
  
  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled || loading ? disabledClasses : ''}
    ${className}
  `.trim();

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {/* Spinner de carga */}
      {loading && (
        <svg 
          className="animate-spin h-5 w-5 mr-1" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {/* Contenido del botón */}
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Efecto de brillo animado */}
      {!disabled && !loading && (
        <div className="absolute inset-0 -z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      )}
    </button>
  );
};

export default Button;