import axios from "axios";
import { useHistory } from "react-router";
import { AUTH_API } from "../constants";

const { createContext, useState } = require("react");

export const authContext = createContext({
  logged: false,
  doLogin: () => null,
});

export const AuthContextProvider = ({ children }) => {
  const tokenInLocalStorage = localStorage.getItem("token");
  const [logged, setLogged] = useState(!!tokenInLocalStorage);
  const history = useHistory();
  const doLogin = (email, password) => {
    axios
      .post(AUTH_API, {
        email: email,
        password: password,
      })
      .then((response) => {
        setLogged(true);
        localStorage.setItem("token", response.data.token);
        history.push("/home");
      })
      .catch(() => {
        alert("Credenciales inválidas");
      });
  };
  return (
    <authContext.Provider value={{ logged: logged, doLogin: doLogin }}>
      {children}
    </authContext.Provider>
  );
};
