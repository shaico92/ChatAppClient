import React, { useEffect, useState } from "react";
import axios from "../api/axios";
const Signup = ({}) => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const formValidation = (name, password, email) => {
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
  const createUser = (name, password, email) => {
    const isValid = formValidation(name, password, email);
    if (isValid) {
      if (
        password !== null &&
        name !== null &&
        password !== "" &&
        name !== "" &&
        email !== null &&
        email !== ""
      ) {
        const userCred = { name: name, password: password, email: email };
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

  useEffect(() => {
    setPassword("");
    setName("");
    setEmail("");
  }, [submit]);
  useEffect(() => {}, [errorMsg]);
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
        <div>
          <button onClick={() => createUser(name, password, email)}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
