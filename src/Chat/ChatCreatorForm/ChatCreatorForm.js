import React, { useEffect, useState } from "react";
import Style from "./ChatCreatorFormStyle.json";
import "./ChatCreatorFormStyle.css";
import ChatContainer from "../../ChatContainer/ChatContainer";
import Modal from "../../UI/Modal/Modal";
const ChatCreatorForm = ({
  createRoomHandler,
  formOpen,
  closeForm,
  currentUserCookie,
}) => {
  const [chatName, setChatName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {}, [formOpen]);
  return formOpen === true && currentUserCookie ? (
    <Modal
      customStyle={Style.Modal}
      closeModal={() => closeForm()}
      open={formOpen}
    >
      <div style={Style.Form}>
        {chatName === "" ? (
          <h1>Please choose a chat name</h1>
        ) : (
          <h1>{chatName}</h1>
        )}
        <div className="form-content">
          <div>
            <input
              maxlength="39"
              type="text"
              placeholder="chat room name"
              onChange={(event) => setChatName(event.target.value)}
            ></input>
          </div>
          <div>
            <input
              maxlength="13"
              type="password"
              placeholder="Please Enter Password"
              onChange={(event) => setPassword(event.target.value)}
            ></input>
          </div>
          <div>
            {chatName === "" ? (
              <button onClick={() => createRoomHandler(chatName)} disabled>
                Create Room
              </button>
            ) : (
              <button onClick={() => createRoomHandler(chatName)}>
                Create Room
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  ) : null;
};

export default ChatCreatorForm;
