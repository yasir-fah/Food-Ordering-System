import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom";

import Form from "./Form";

const FormModal = forwardRef(function FormModal({title, total}, ref) {

  const dialog = useRef();

  useImperativeHandle(ref, ()=>{
    return{
      open: () =>{
      dialog.current.showModal();
    },
    close: () =>{
      dialog.current.close();
    }
    }


  })
  return createPortal(
    <dialog className="modal" ref={dialog}>
      <h2>{title}</h2>
      <Form total={total}/>
    </dialog>,
    document.getElementById("modal")
  );
})

export default FormModal