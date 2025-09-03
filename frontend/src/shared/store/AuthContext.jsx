import { createContext, useReducer } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  login: () => { },
  logout: () => { },
});

// Reducer function using if/else
function authReducer(state, action) {
  if (action.type === "LOGIN") {
    return { isLoggedIn: true, userId: action.userId };
  }

  if (action.type === "LOGOUT") {
    return { isLoggedIn: false, userId: null };
  }

  return state; // fallback for unknown actions
}

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, { isLoggedIn: false, userId: null, });

  const login = (uid) => {
    dispatch({ type: "LOGIN", userId: uid });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const authContext = {
    isLoggedIn: state.isLoggedIn,
    userId: state.userId,
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
