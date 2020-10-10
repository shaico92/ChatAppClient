import React, {  useEffect } from "react";

import "./Modal.css";

const Modal = ({ open, closeModal, children,customStyle ,header,footer}) => {
  useEffect(() => {}, [open]);
  return open ? (


    <div style={customStyle} class="modal-content">
      {
        header ?   <div class="modal-header">
        <span onClick={() => closeModal()} class="close">
          &times;
        </span>
        <h2>Modal Header</h2>
      </div>:
      <span onClick={() => closeModal()} class="close">
      &times;
    </span>
      }
      <div class="modal-body">{children}</div>
      {
        header ?   <div class="modal-footer">
        <h3>Modal Footer</h3>
      </div>:null
      }
      
    </div>
  ) : null;
};
export default Modal;
