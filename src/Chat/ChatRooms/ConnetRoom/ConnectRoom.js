import React, { useState, useEffect } from "react";

import Modal from "../../../UI/Modal/Modal";
import Style from "./ConnectRoom.json";
const ConnectRoomHandler = ({
  formOpen,
  closeForm,
  connectToChat,
  chatToConnect,
  password,
}) => {
  useEffect(() => {
    console.log(chatToConnect);
  }, [formOpen]);

  const [password_, setPassword] = useState("");
  return formOpen === true ? (
    <Modal
      customStyle={Style.Modal}
      closeModal={() => closeForm()}
      open={formOpen}
    >
      <div style={Style.Form}>
        <div>
          <h1>connect to {chatToConnect}</h1>
        </div>
        <div>
          {password ? (
            <input
              maxLength="13"
              type="password"
              placeholder="Please Enter Password"
              onChange={(event) => setPassword(event.target.value)}
            ></input>
          ) : null}
        </div>
        <div>
          <button onClick={() => connectToChat(password_)}>
            Connect To Chat
          </button>
        </div>
      </div>
    </Modal>
  ) : null;
};

export default ConnectRoomHandler;
