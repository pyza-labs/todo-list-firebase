import React, { useState } from "react";
import Styles from "./LoginPage.module.css";
import { Input, Button } from "antd";
import { auth } from "../../services/firebase/firebase";

const LoginPage = props => {
  const [email = "", setEmail] = useState();
  const [pass = "", setPass] = useState();

  const emailHandler = event => {
    setEmail(event.target.value);
  };

  const passHandler = event => {
    setPass(event.target.value);
  };

  const loginHandler = event => {
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(error => console.log(error.message));
  };

  const signUpHandler = event => {
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(error => console.log(error.message));
  };

  return (
    <div className={Styles.login}>
      <div className={Styles.inputDiv}>
        <Input
          placeholder="Email"
          className={Styles.input}
          onChange={emailHandler}
        ></Input>
        <Input
          placeholder="Password"
          className={Styles.input}
          onChange={passHandler}
        ></Input>
      </div>
      <div className={Styles.buttonDiv}>
        <Button className={Styles.button} onClick={loginHandler}>
          Login
        </Button>
        <Button className={Styles.button} onClick={signUpHandler}>
          SignUp
        </Button>
      </div>
    </div>
  );
};
export default LoginPage;
