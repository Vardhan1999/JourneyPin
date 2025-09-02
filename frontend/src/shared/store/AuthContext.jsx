import { createContext, useReducer } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// Reducer function using if/else
function authReducer(state, action) {
  if (action.type === "LOGIN") {
    return { isLoggedIn: true };
  }

  if (action.type === "LOGOUT") {
    return { isLoggedIn: false };
  }

  return state; // fallback for unknown actions
}

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, { isLoggedIn: false });

  const login = () => {
    dispatch({ type: "LOGIN" });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const authContext = {
    isLoggedIn: state.isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
