import { useContext, useRef } from "react";
import { Context } from "../store/shopping-cart-context";
import useFetch from "../hooks/useFetch";
import { getAllProduct } from "../http";
import FormModal from "./FormModal";

function Cart() {
  // take 'context' to access items & 'updateQuantity()' from CTX Provider
  const { items, updateQuantity } = useContext(Context);
  const { fetchedData: products } = useFetch(getAllProduct);

  // ref() for open/close formModal:
  const modal = useRef();

  // items: store the id only - we can compare 'items' & 'raw products' - then represent actual products
  const cartItems = items.map((currentItem) => {
    const product = products.find(
      (currentProduct) => currentProduct.id === currentItem.id
    );

    // return new object 'cartItems' : [product.children + quantity]
    return {
      ...product,
      quantity: currentItem.quantity,
    };
  });


  // calculate total price:
  let totalPrice = 0;
  for (const item of cartItems) {
    totalPrice += item.price * item.quantity;
  }

  function handleOpenCheckout() {
    modal.current.open();
  }
  
  return (
    <div id="cart">
      {cartItems.length === 0 && <p>No items in cart!</p>}
      {cartItems.length > 0 && (
        <ul id="cart-items">
          <FormModal ref={modal} title="Checkout" total={totalPrice}/>
          {cartItems.map((item) => {
            const formattedPrice = `$${(item.price * item.quantity).toFixed(2)}`;

            return (
              <li key={item.id} className="cart-item">
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, +1)}>+</button>
                </div>
              </li>
            );
          })}
        </ul> 
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{totalPrice}</strong>
      </p>
      <form method="dialog" id="modal-actions">
        {/* TODO: make modal hidden  */}
        <button className="text-button">Close</button>
        {cartItems.length > 0 && (
          <button className="button" type="button" onClick={handleOpenCheckout}>Checkout</button>
        )}
      </form>
    </div>
  );
}

export default Cart;
