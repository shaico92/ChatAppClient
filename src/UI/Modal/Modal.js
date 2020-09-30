import React, { useEffect } from "react";

import "./Modal.css";

const Modal = ({ open, closeModal }) => {
  useEffect(() => {}, [open]);
  return open ? (
    <div class="modal-content">
      <div class="modal-header">
        <span onClick={() => closeModal()} class="close">
          &times;
        </span>
        <h2>Modal Header</h2>
      </div>
      <div class="modal-body">
        <p>Some text in the Modal Body</p>
        <p>Some other text...</p>
      </div>
      <div class="modal-footer">
        <h3>Modal Footer</h3>
      </div>
    </div>
  ) : null;
};
export default Modal;
