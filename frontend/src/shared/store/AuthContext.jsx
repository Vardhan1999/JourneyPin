import { createContext, useCallback, useState } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
});

export function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = useCallback(() => {
        setIsLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
    }, []);

    const authContext = {
        isLoggedIn,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
