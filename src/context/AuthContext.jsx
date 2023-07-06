import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";
import {orderRequest} from "../api/product";
import Cookies from "js-cookie";


export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
      setErrors(err.response.data.message);
    }
  };

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data.token);
      setIsAuthenticated(true);
      setUser(res.data);
      // Save token in local storage
      localStorage.setItem("userData", JSON.stringify(res.data.token));
    } catch (err) {
      console.log(err.response.data);
      localStorage.setItem("userData", JSON.stringify(err.response.data));
      setErrors(
        "Las credenciales proporcionadas no son válidas. Por favor, verifique su email y contraseña e intente nuevamente."
      );
    }
  };

  const generateOrder = async (body) => {
    try {
      const res = await orderRequest(body);
      console.log(res);
      return res; // Devuelve la respuesta
    } catch (err) {
      console.log(err.response.data);
      throw err; // Lanza el error para manejarlo en el componente
    }
  }

  const localStorageValue = localStorage.getItem("userData");
  document.cookie = `userData=${localStorageValue}; path=/`.replace(/\"/g, "");

  //Para eliminar la cookie
  // const limitTime = 10000;

  // setTimeout(() => {
  //   localStorage.removeItem("userData");

  //   // Eliminar la cookie existente
  //   document.cookie =
  //     "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  //   // Establecer una nueva cookie con el valor actualizado desde el localStorage
  //   const updatedValue = localStorage.getItem("userData");
  //   document.cookie = `userData=${updatedValue}; path=/`;
  // }, limitTime);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    function checkLogin() {
      const cookie = Cookies.get("userData");

      if (cookie == "Unauthorized" || cookie == "undefined" || cookie == "null") {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      setIsAuthenticated(true);
      setUser(cookie);
      setLoading(false);
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        loading,
        user,
        isAuthenticated,
        errors,
        generateOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
