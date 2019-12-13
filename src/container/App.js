import React, { useState, useEffect } from "react";
import HomeScreen from "./Home/Home";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
import LoginPage from "./LoginPage/LoginPage";
import Navbar from "../components/Navbar/Navbar";
import firebase from "../services/firebase/firebase";

library.add(far, faCheckSquare, faCoffee);

function App() {
  const [isLogin = false, setIsLogin] = useState();
  const [fireUser = " ", setFireUser] = useState();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser);
        setIsLogin(true);
        setFireUser(firebaseUser);
      } else {
        console.log("Not Logged In");
        setIsLogin(false);
        setFireUser("");
      }
    });
    return unsubscribe;
  }, []);

  const logoutHandler = () => {
    firebase.auth().signOut();
  };

  return (
    <div className="App">
      <Navbar logout={logoutHandler} />
      {isLogin ? <HomeScreen fireUser={fireUser} /> : <LoginPage />}
    </div>
  );
}

export default App;
