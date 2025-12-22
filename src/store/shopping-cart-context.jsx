import { useReducer, createContext } from "react";

// creating the context provider():
export const Context = createContext({
  items: [],
  addItemToCart: () => {},
  updateQuantity: () => {},
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

  // set global Context value Object: exposing state & functions:  
  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateQuantity: handleUpdateCartItemQuantity,
  };

  return <Context.Provider value={ctxValue}>{children}</Context.Provider>;
}
