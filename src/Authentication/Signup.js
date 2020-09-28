import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import './Signup.css'
const Signup = ({}) => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [image,setImage] = useState('')
  const formValidation = (image,name, password, email) => {
    let validationSuccess = true;

    if (name === "") {
      setErrorMsg("Please type your name");
      validationSuccess = false;
    } else if (!email.includes("@") || email.length === 0) {
      setErrorMsg("Please type a valid email");
      validationSuccess = false;
    } else if (password.length < 10 || password.length === 0) {
      setErrorMsg("Password must be at least 10 characters");
      validationSuccess = false;
    }

    return validationSuccess;
  };
  const addPicture = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      //const url = URL.createObjectURL(file);
      setImage(file)
    }
  };
  const createUser = (image,name, password, email) => {
    const isValid = formValidation(image,name, password, email);
    if (isValid) {
      if (
        password !== null &&
        name !== null &&
        password !== "" &&
        name !== "" &&
        email !== null &&
        email !== ""
      ) {
        const userCred = {image:image, name: name, password: password, email: email };
        setSubmit(true);
        axios
          .post("/register", userCred)
          .then((res) => {
            setErrorMsg(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  
  
  return (
    <div style={{ marginTop: "30%" }}>
      <div>
        <div style={{ color: "red" }}>{errorMsg}</div>
        <div>
          <input
            value={name}
            type="text"
            onChange={(event) => setName(event.target.value)}
            placeholder={"Please Enter your name"}
          ></input>
        </div>
        <div>
          <input
            value={email}
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder={"Please Enter a valid Email"}
          ></input>
        </div>
        <div>
          <input
            value={password}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder={"Please Enter Password"}
          ></input>
          
        </div>
        <div className={"image"}>
        <label for="files" class="btn">Select Image</label>
        <input
          id="files"
          type="file"
          onChange={(event) => addPicture(event)}
          accept="image/*"
          
        ></input>
        </div>
        <div>
          <button onClick={() => createUser(image,name, password, email)}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
