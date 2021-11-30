import { useFormik } from "formik";
import React, { useContext } from "react";
import { emailRegex } from "../constants";
import { authContext } from "../contexts/auth-context";
import "./login.css";
import "animate.css";
function Login() {
  const { doLogin } = useContext(authContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      doLogin(values.email, values.password);
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email requerido";
      } else if (!emailRegex.test(values.email)) {
        errors.email = "Email inválido";
      }
      if (!values.password) {
        errors.password = "Contraseña requerida";
      }
      return errors;
    },
  });
  return (
    <div className="container">
      <div class="">
        <div class="">
          <div class=" ">
            <form class="box " onSubmit={formik.handleSubmit}>
              <div class="">
                <h1>Superhero</h1>
              </div>
              <div class="">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <span>{formik.errors.email}</span>
              </div>
              <div>
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <span>{formik.errors.password}</span>
              </div>
              <button type="submit" className="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
