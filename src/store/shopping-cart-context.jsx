import { useReducer, createContext } from "react";

// creating the context provider():
export const Context = createContext({
  items: [],
  addItemToCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {} 
});


// shopping cart reducer function, will be called by dispatch():
function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingItem = state.items.find(
      item => item.id === action.payload
    );

    let updatedItems;

    if (existingItem) {
      updatedItems = state.items.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedItems = [
        ...state.items,
        { id: action.payload, quantity: 1 }
      ];
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = state.items
      .map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + action.amount }
          : item
      )
      .filter(item => item.quantity > 0);

    return { ...state, items: updatedItems };
  }

  
  // 1. Add this case to clear the items array
  if (action.type === 'CLEAR_CART') {
    return {
      ...state,
      items: [],
    };
  }

  return state;
}


// adding the ContextProvider Component:
export function ContextProvider({ children }) {
  // adding useReducer function:
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    { items: [] }
  );


  // handle add items function: deal with dispatch()
  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  }

  // handle update items function: deal with dispatch()
  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      amount: amount,
      payload: productId,
    });
  }

  // clear cart after submit the order:
  function handleClearCartItems() {
    shoppingCartDispatch({
      type: "CLEAR_CART"
    })
  }


  // set global Context value Object: exposing state & functions:  
  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateQuantity: handleUpdateCartItemQuantity,
    clearCart: handleClearCartItems
  };

  return <Context.Provider value={ctxValue}>{children}</Context.Provider>;
}
