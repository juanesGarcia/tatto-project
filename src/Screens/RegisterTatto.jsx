import { useState} from "react";
import "../Styles/Register.css";
import Swal from "sweetalert2";
import { onRegistration } from "../api/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { onLogin } from "../api/auth";
import { authenticateUser, setInfo } from "../redux/slices/authSlice";

export const RegisterTatto = () => {
  const [errores, setErrores] = useState(false);
  const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    rol: "tatuador",
    phone: "",
  });

    const toggleShowPassword = () => {
    setUser((prevUser) => ({
      ...prevUser,
      showPassword: !prevUser.showPassword,
    }));
  };

  const toggleShowConfirmPassword = () => {
    setUser((prevUser) => ({
      ...prevUser,
      showConfirmPassword: !prevUser.showConfirmPassword,
    }));
  };



  const handleCountryCodeChange = async (e) => {
    const countryName = e.target.value;
    setUser({ ...user, countryName });

    try {
      // Obtener información del país desde REST Countries
      const response = await axios.get(
        `https://restcountries.com/v2/name/${countryName}`
      );
      const countryData = response.data[0]; // Tomar el primer resultado

      setUser({
        ...user,
        countryFlag: countryData?.flags?.svg || "",
        countryCode: countryData?.alpha2Code || "",
        phone: `+${countryData?.callingCodes[0]}` || "",
      });
    } catch (error) {
      console.error("Error fetching country information:", error);
      setUser({ ...user, countryFlag: "", phone: "", countryCode: "" });
    }
  };

  const handleSummit = async (e) => {
    e.preventDefault();

    const userData = {
      ...user,
      phone: `${user.phone}${user.numberphone}`,
    };

    if (user.password === user.passwordConfirm) {
      try {
        const response = await onRegistration(userData);
        console.log(response);
        if (response.data.success) {
           try {
            const userLogin = {
              email: user.email,
              password: user.password,
            }
            console.log(userLogin)
                    const infoUser = await onLogin(userLogin);
                    dispatch(authenticateUser());
                    dispatch(setInfo(infoUser.data.info));
                    console.log('Token:', infoUser.data.token);  // Verifica si el token está presente
                    console.log('Info:', infoUser.data.info)
                    // Guarda tanto el token como la info en 'authData'
                    localStorage.setItem('authData', JSON.stringify(
                      infoUser.data
                    ));
                
                  } catch (error) {
                    setErrores(error.response.data.errors[0]);
                    console.log(error.response.data.errors[0]);
                  }
          setRegistrationSuccess(true);
          navigate('/MapaUser');
          // navigate("/login"); // Redirigir al inicio de sesión
        }
      } catch (error) {
        setErrores(error.response.data.errors[0]);
        console.log(error.response.data.errors[0]);
        Swal.fire({
          title: "Error",
          text: errores,
          icon: "error",
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            confirmButton: "custom-swal-confirm-button",
          },
          buttonsStyling: false,
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "las contraseñas no coinciden ",
        icon: "error",
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm-button",
        },
        buttonsStyling: false,
      });
    }
  };

  const handleOnchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="containerRegister">
      <div className="login-box">
        <p>Registro</p>
        <form onSubmit={handleSummit} autoComplete="off">
          <div className="user-box">
            <input
              required=""
              name="name"
              type="text"
              onChange={handleOnchange}
              className="info-input"
            />
            <label className="label">Nombre De Usuario</label>
          </div>
          <div className="user-box">
            <input
              required=""
              name="email"
              type="text"
              onChange={handleOnchange}
              className="info-input"
            />
            <label className="label">Email</label>
          </div>
          <div className="user-box">
              <input
                required=""
                name="password"
                onChange={handleOnchange}
                type={user.showPassword ? "text" : "password"}
                autoComplete="off"
                className="info-input"
              />
              <label className="label">Contraseña</label>
              {user.showPassword ? (
                <VisibilityIcon
                  onClick={toggleShowPassword}
                  className="visibility-right"
                ></VisibilityIcon>
              ) : (
                <VisibilityOffIcon
                  onClick={toggleShowPassword}
                  className="visibility-right"
                ></VisibilityOffIcon>
              )}
            </div>
            <div className="user-box">
              <input
                required=""
                name="passwordConfirm"
                type={user.showConfirmPassword ? "text" : "password"}
                onChange={handleOnchange}
                autoComplete="off"
                className="info-input"
              />
              <label className="label">Comfirma La Contraseña</label>
              {user.showConfirmPassword ? (
                <VisibilityIcon
                  onClick={toggleShowConfirmPassword}
                  className="visibility-right"
                ></VisibilityIcon>
              ) : (
                <VisibilityOffIcon
                  onClick={toggleShowConfirmPassword}
                  className="visibility-right"
                ></VisibilityOffIcon>
              )}
                
            </div>
          <div className="user-box">
            {/* Nuevo campo para el nombre del país */}
            {user.countryFlag && (
              <div>
                {/* Mostrar la bandera del país */}
                <img
                  src={user.countryFlag}
                  alt="Country Flag"
                  style={{ width: "50px", height: "auto" }}
                  className="flag"
                />
              </div>
            )}
            <input
              required=""
              name="countryName"
              type="text"
              placeholder="Nombre De Tu Pais"
              onChange={handleCountryCodeChange}
              className="phone"
            />
          </div>
          <label className="label">Telefono</label>
          <div className="user-box">
            {/* Campo de teléfono */}
             
            <div className="code">
              <input
                required=""
                name="phone"
                type="text"
                value={user.phone}
                onChange={handleOnchange}
                className="phone"
              />
            </div>
           
            <input
              required=""
              name="numberphone"
              type="text"
              placeholder="Numero"
              onChange={handleOnchange}
              className="phone"
            />
          </div>

          <button type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};
