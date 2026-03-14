import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  let decodedUser = null;

  if (storedUser?.token) {
    try {
      decodedUser = jwtDecode(storedUser.token);
    } catch {
      localStorage.removeItem("user");
    }
  }

  const [user, setUser] = useState(decodedUser);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(jwtDecode(userData.token));
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};