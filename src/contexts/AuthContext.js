import React, { useContext, useState } from "react";

const AuthContext = React.createContext();
const AuthtUpdateContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthUpdate() {
  return useContext(AuthtUpdateContext);
}

export function AuthProvider({ children }) {
  const [state, setState] = useState(null);
  const func = (data) => {
    setState(data);
  };

  return (
    <AuthContext.Provider value={state}>
      <AuthtUpdateContext.Provider value={func}>
        {children}
      </AuthtUpdateContext.Provider>
    </AuthContext.Provider>
  );
}
