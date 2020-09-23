import React, { useEffect, useState } from "react";
import axios from "../api/axios";
const Signup = ({}) => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);
  const [serverResult, setServerRsult] = useState(null);

  const formValidation = async (name, password, email) => {
    let validationSuccess = true;

    if (name === "") {
      setServerRsult("Please type your name");
      validationSuccess = false;
    } else if (!email.includes("@") || email.length === 0) {
      setServerRsult("Please type a valid email");
      validationSuccess = false;
    } else if (password.length < 10 || password.length === 0) {
      setServerRsult("Password must be at least 10 characters");
      validationSuccess = false;
    } else {
      validationSuccess = true;
    }

    return validationSuccess;
  };
  const createUser = (name, password, email) => {
    if (formValidation(name, password, email) !== false) {
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
            setServerRsult(res.data);
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
  useEffect(() => {}, [serverResult]);
  return (
    <div style={{ marginTop: "30%" }}>
      <div>
        <div style={{ color: "red" }}>{serverResult}</div>
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
