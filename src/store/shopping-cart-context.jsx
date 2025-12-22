import { useState, useReducer, createContext } from "react";
import useFetch from "../hooks/useFetch";
import { getAllProduct } from "../http";

// storing the fetched product:
const { fetchedData: DUMMY_PRODUCTS } = useFetch(getAllProduct);

// creating the context provider():
export const Context = createContext({
  items: [],
  addItemToCart: () => {},
  updateQuantity: () => {},
});


// shopping cart reducer function, will be called by dispatch():
function shoppingCartReducer(state, action) {
  if (action.type == "ADD_ITEM") {
    const updatedItems = [...state.items]; // we set 'all items' at this variable

    const existingCartItemIndex = updatedItems.findIndex(
      // check if item exist
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex]; // save the desired item

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1, // plus quantity by 1, for desired item
      };
      updatedItems[existingCartItemIndex] = updatedItem; // update our array.
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    // set our local state with: items user add/update:
    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type == "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    // set our local state with: items user add/update:
    return {
      ...state,
      items: updatedItems,
    };
  }
}

// adding the ContextProvider Component:
export function ContextProvider({ children }) {
  // adding useReducer function:
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    { items: [] }
  );

  // adding the state
  const [shoppingCart, setShoppingCart] = useState({ items: [] });

  // handle add items function: deal with dispatch()
  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  }

  // handle update items function: deal with dispatch()
  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: id,
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

