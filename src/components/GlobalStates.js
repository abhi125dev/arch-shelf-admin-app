import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authState, setAuthState] = useState({});

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {props.children}
    </AuthContext.Provider>
  );
};
