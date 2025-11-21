import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes, FaShoppingCart, FaHeart, FaTrash } from 'react-icons/fa';

// Contexto de Toast
const ToastContext = createContext();

// Hook personalizado
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe usarse dentro de ToastProvider');
  }
  return context;
};

// Componente individual de Toast
const Toast = ({ id, type, message, onClose, icon, duration = 800 }) => {
  const [isExiting, setIsExiting] = React.useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(id), 200);
  };

  React.useEffect(() => {
    const timer = setTimeout(handleClose, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const styles = {
    success: 'from-green-500 to-emerald-600 border-green-400',
    error: 'from-red-500 to-pink-600 border-red-400',
    warning: 'from-orange-500 to-yellow-500 border-orange-400',
    info: 'from-blue-500 to-indigo-600 border-blue-400',
    cart: 'from-indigo-600 to-purple-600 border-indigo-400'
  };

  const icons = {
    success: <FaCheckCircle className="text-2xl" />,
    error: <FaExclamationCircle className="text-2xl" />,
    warning: <FaExclamationCircle className="text-2xl" />,
    info: <FaInfoCircle className="text-2xl" />,
    cart: <FaShoppingCart className="text-2xl" />
  };

  return (
    <div
      className={`transform transition-all duration-200 ${
        isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
      }`}
    >
      <div className={`bg-gradient-to-r ${styles[type]} text-white px-4 py-3 rounded-xl shadow-xl border-2 backdrop-blur-md flex items-center gap-3 min-w-[280px] max-w-sm relative overflow-hidden`}>
        {/* Icono */}
        <div className="flex-shrink-0">
          {icon || icons[type]}
        </div>

        {/* Mensaje */}
        <div className="flex-1">
          <p className="font-bold text-xs leading-relaxed">{message}</p>
        </div>

        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
        >
          <FaTimes className="text-xs" />
        </button>

        {/* Barra de progreso - ahora de 800ms */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-white/30 rounded-full overflow-hidden w-full">
          <div 
            className="h-full bg-white/60"
            style={{
              animation: `shrink ${duration}ms linear forwards`
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Provider del Toast
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Agregar estilos CSS globalmente
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
      @keyframes shrink {
        from { width: 100%; }
        to { width: 0%; }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const addToast = useCallback((message, type = 'info', icon = null, duration = 800) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, icon, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Métodos específicos con mejor UX - TODOS con 800ms (menos de 1 segundo)
  const toast = {
    success: (message) => addToast(message, 'success', null, 800),
    error: (message) => addToast(message, 'error', null, 800),
    warning: (message) => addToast(message, 'warning', null, 800),
    info: (message) => addToast(message, 'info', null, 800),
    
    // 🔥 Notificaciones personalizadas para e-commerce - 800ms
    addedToCart: (productName) => addToast(
      `${productName} agregado al carrito`,
      'cart',
      <FaShoppingCart className="text-xl" />,
      1500 // 0.8 segundos
    ),
    removedFromCart: (productName) => addToast(
      `${productName} eliminado del carrito`,
      'warning',
      <FaTrash className="text-xl" />,
      1500 // 0.8 segundos
    ),
    addedToWishlist: (productName) => addToast(
      `${productName} agregado a favoritos`,
      'success',
      <FaHeart className="text-xl" />,
      1500 // 0.8 segundos
    ),
    outOfStock: () => addToast(
      'Producto agotado',
      'error',
      null,
      1500 // 0.8 segundos
    ),
    cartCleared: () => addToast(
      'Carrito vaciado',
      'info',
      null,
      1500 // 0.8 segundos
    ),
    
    // Métodos con duración personalizable
    custom: (message, type = 'info', customDuration = 800) => 
      addToast(message, type, null, customDuration)
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      
      {/* Contenedor de Toasts */}
      <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} onClose={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastContext;