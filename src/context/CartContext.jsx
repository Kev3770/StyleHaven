import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// 🔥 MEJORA 1: Cargar estado inicial desde localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('stylehaven-cart');
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      return calculateTotals(parsed);
    }
  } catch (error) {
    console.error('Error loading cart:', error);
  }
  return initialState;
};

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
  TOGGLE_CART: 'TOGGLE_CART',
  LOAD_CART: 'LOAD_CART'
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

// Reducer para manejar las acciones del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && item.size === action.payload.size
      );

      let newItems;
      
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
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

    case CART_ACTIONS.LOAD_CART:
      return action.payload;

    default:
      return state;
  }
};

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, loadCartFromStorage);

  // 🔥 MEJORA 2: Guardar en localStorage cada vez que cambie el carrito
  useEffect(() => {
    try {
      localStorage.setItem('stylehaven-cart', JSON.stringify({
        items: state.items,
        total: state.total,
        itemCount: state.itemCount,
        isOpen: false // No guardar el estado de apertura
      }));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [state.items, state.total, state.itemCount]);

  // Acciones mejoradas
  const addToCart = (product, size = 'M', quantity = 1) => {
    // 🔥 MEJORA 3: Validación antes de agregar
    if (!product.inStock) {
      console.warn('Producto agotado');
      return { success: false, message: 'Producto agotado' };
    }

    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        discount: product.discount || 0,
        image: product.image,
        category: product.category,
        size,
        quantity,
        maxStock: 10
      }
    });

    return { success: true, message: 'Producto agregado al carrito' };
  };

  const removeFromCart = (productId, size) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id: productId, size }
    });
  };

  const updateQuantity = (productId, size, quantity) => {
    // 🔥 MEJORA 4: Validación de cantidad
    if (quantity < 0) return;
    if (quantity > 10) {
      console.warn('Cantidad máxima: 10');
      return;
    }

    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: productId, size, quantity }
    });
  };

  const clearCart = () => {
    if (window.confirm('¿Estás seguro de vaciar el carrito?')) {
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
      return true;
    }
    return false;
  };

  const toggleCart = () => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART });
  };

  // 🔥 MEJORA 5: Métodos útiles adicionales
  const getCartItem = (productId, size) => {
    return state.items.find(item => item.id === productId && item.size === size);
  };

  const isInCart = (productId, size) => {
    return state.items.some(item => item.id === productId && item.size === size);
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
    toggleCart,
    
    // Utilidades
    getCartItem,
    isInCart
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