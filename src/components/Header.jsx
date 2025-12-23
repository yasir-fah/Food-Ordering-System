import logo from "../assets/logo.jpg";
import { useContext, useRef } from "react";
import { Context } from "../store/shopping-cart-context";
import CartModal from "./CartModal";

function Header() {
  const modal = useRef();
  // import the items from 'Context'
  const { items } = useContext(Context);

  const itemsQuantity = items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  return (
    <header id="main-header">
      <CartModal ref={modal} title="Your Cart" />
      <div id="title">
        <img src={logo} alt="A restaurant logo" />
        <h1>ReactFood</h1>
      </div>
      <button onClick={handleOpenCartClick}>Cart ({itemsQuantity})</button>
    </header>
  );
}

export default Header;
