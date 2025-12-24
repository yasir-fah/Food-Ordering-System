import { useRef, forwardRef, useImperativeHandle } from "react";
import Cart from "./Cart";
import { createPortal } from "react-dom";

const CartModal = forwardRef(function CartModal({ title }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog className="modal " ref={dialog}>
      <h2>{title}</h2>
      <Cart />
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;
