import React from "react";

import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { signInWithGoogle } from "../adapters/firebase-adapter";

function SignIn({ onSignIn, ...props }) {
  const signInHandler = () => {
    signInWithGoogle().then((userCredentials) => {
      if (userCredentials) {
        onSignIn(userCredentials);
      }
    });
  };

  return (
    <>
      <button className="btn btn-primary" onClick={signInHandler}>
        Ingresa con Google
      </button>
    </>
  );
}

export default SignIn;
