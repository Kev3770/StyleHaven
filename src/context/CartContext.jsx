import React, { createContext, useContext, useReducer } from 'react';

// Crear el contexto
const CartContext = createContext();

// Estado inicial del carrito
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false
};

// Tipos de acciones
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  TOGGLE_CART: 'TOGGLE_CART'
};

// Reducer para manejar las acciones del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && item.size === action.payload.size
      );

      let newItems;
      
      if (existingItemIndex >= 0) {
        // Si el item ya existe, aumentar la cantidad
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Si es un item nuevo, agregarlo
        newItems = [...state.items, action.payload];
      }

      return calculateTotals({ ...state, items: newItems });
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter(item => 
        !(item.id === action.payload.id && item.size === action.payload.size)
      );
      return calculateTotals({ ...state, items: newItems });
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const newItems = state.items.map(item =>
        item.id === action.payload.id && item.size === action.payload.size
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);

      return calculateTotals({ ...state, items: newItems });
    }

    case CART_ACTIONS.CLEAR_CART:
      return { ...initialState };

    case CART_ACTIONS.TOGGLE_CART:
      return { ...state, isOpen: !state.isOpen };

    default:
      return state;
  }
};

// Función helper para calcular totales
const calculateTotals = (state) => {
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const total = state.items.reduce((sum, item) => {
    const price = item.discount > 0 
      ? item.price * (1 - item.discount / 100) 
      : item.price;
    return sum + (price * item.quantity);
  }, 0);

  return {
    ...state,
    itemCount,
    total: parseFloat(total.toFixed(2))
  };
};

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Acciones
  const addToCart = (product, size = 'M', quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        image: product.image,
        size,
        quantity,
        maxStock: 10
      }
    });
  };

  const removeFromCart = (productId, size) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id: productId, size }
    });
  };

  const updateQuantity = (productId, size, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: productId, size, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const toggleCart = () => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART });
  };

  const value = {
    // Estado
    items: state.items,
    total: state.total,
    itemCount: state.itemCount,
    isOpen: state.isOpen,
    
    // Acciones
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};