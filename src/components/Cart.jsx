import { useContext } from "react";
import { Context } from "../store/shopping-cart-context";
import useFetch from "../hooks/useFetch";
import { getAllProduct } from "../http";

function Cart() {
  // take 'context' to access items & 'updateQuantity()' from CTX Provider
  const { items, updateQuantity } = useContext(Context);
  const { fetchedData: products } = useFetch(getAllProduct);


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

  return (
    <div id="cart">
      {cartItems.length === 0 && <p>No items in cart!</p>}
      {cartItems.length > 0 && (
        <ul id="cart-items">
          {cartItems.map((item) => {

            return (
              <li key={item.id} className="cart-item">
                <div>
                  <span>{item.name}</span>
                  <span> ({totalPrice})</span>
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
    </div>
  );
}

export default Cart;
