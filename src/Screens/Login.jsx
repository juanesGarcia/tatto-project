import React, { useEffect, useState } from "react";
import "../Styles/Login.css";
import { NavLink } from "react-router-dom";
import { onLogin } from "../api/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authenticateUser, setInfo } from "../redux/slices/authSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoaderLogo from "./LoaderLogo";

export const Login = () => {
  const [errores, setErrores] = useState(false);
  const { isAuth, info } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    email: "",
    password: "",
    showPassword: false, // Estado para alternar la visibilidad de la contraseña
  });
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Simula una carga asíncrona (puedes reemplazar esto con tu lógica de carga real)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Tiempo de simulación de carga: 2 segundos
  }, []);

  const handleSummit = async (e) => {
    e.preventDefault();
    try {
      const infoUser = await onLogin(user);
      console.log(infoUser);
      console.log(infoUser.data.info);

      dispatch(authenticateUser());
      dispatch(setInfo(infoUser.data.info));
      localStorage.setItem("token", JSON.stringify(infoUser.data));
    } catch (error) {
      setErrores(error.response.data.errors[0]);
      console.log(error.response.data.errors[0]);
    }
  };

  const handleOnchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setUser((prevUser) => ({
      ...prevUser,
      showPassword: !prevUser.showPassword,
    }));
  };

  return (
    <>
      {isLoading && <LoaderLogo></LoaderLogo>}
      <div className="containerLogin">
        <div className="login-boxLogin">
          <p>Login</p>
          <form onSubmit={handleSummit}>
            <div className="user-boxLogin">
              <input
                required=""
                className="email"
                name="email"
                type="text"
                onChange={handleOnchange}
              />
              <label className="label">Email</label>
            </div>
            <div className="user-boxLogin">
              {/* Campo de contraseña personalizado */}
              <div className="password-container">
                <input
                  required=""
                  name="password"
                  type={user.showPassword ? "text" : "password"}
                  value={user.password}
                  onChange={handleOnchange}
                  autoComplete="off"
                />
                {user.showPassword ? (
                  <VisibilityIcon
                    onClick={toggleShowPassword}
                    className="visibility"
                  ></VisibilityIcon>
                ) : (
                  <VisibilityOffIcon
                    onClick={toggleShowPassword}
                    className="visibility"
                  ></VisibilityOffIcon>
                )}
              </div>
              <label className="label" type="label">
                Password
              </label>
            </div>
            <button type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
            <div style={{ color: "red", margin: "10px 0" }}>{errores}</div>
          </form>
          <p>
            Don't have an account?{" "}
            <NavLink className="a2" to="/ChooseRegister">
              Sign up!
            </NavLink>{" "}
          </p>
        </div>
      </div>
    </>
  );
};
