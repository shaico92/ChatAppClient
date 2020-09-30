import React, { Children, useEffect } from "react";

import "./Modal.css";

const Modal = ({ open, closeModal, children }) => {
  useEffect(() => {}, [open]);
  return open ? (
    <div class="modal-content">
      <div class="modal-header">
        <span onClick={() => closeModal()} class="close">
          &times;
        </span>
        <h2>Modal Header</h2>
      </div>
      <div class="modal-body">{children}</div>
      <div class="modal-footer">
        <h3>Modal Footer</h3>
      </div>
    </div>
  ) : null;
};
export default Modal;
