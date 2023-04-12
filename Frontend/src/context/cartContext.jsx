import { createContext, useReducer, useContext, useEffect } from 'react';
import reducer from '../reducer/cartReducer';

const CartContext = createContext();

const getLocalCartdata = () => {
  let localCartdata = localStorage.getItem("Cart_Item");
  if (localCartdata == []) {
    return [];
  }
  else {
    return JSON.parse(localCartdata)
  }
}

const initialState = {
  //cart: [],
  cart: getLocalCartdata(),
  total_item: "",
  total_amount: ""
}

const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const addtocart = (_id, quantity, curElement) => {
    dispatch({ type: "ADD_TO_CART", payload: { _id, quantity, curElement }});
  }

  const decrese = (id) => {
    dispatch({type:"DECRESE", payload:id})
  }

  const increse = (id) => {
    dispatch({type:"INCRESE", payload:id})
  }

  const removefood = (id) => {
    dispatch({ type: "REMOVE_FOOD", payload: id })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }


  // Add data to local storage because when we refresh then data vanish
  useEffect(() => {
    localStorage.setItem("Cart_Item", JSON.stringify(state.cart))
  }, [state.cart]);

  return <CartContext.Provider value={{ ...state, addtocart, removefood, clearCart,increse, decrese }}>{children}</CartContext.Provider>;
}

const useCartContext = () => {
  return useContext(CartContext)
}


export { CartProvider, useCartContext }