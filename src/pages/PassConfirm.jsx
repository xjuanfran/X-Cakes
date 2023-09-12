import "../styles/register.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
//import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function PassConfirm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  //const { changePassWord } = useAuth(); => For send info to backend

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="containerEver">
      <div className="login-box">
        <h2>X Cakes</h2>
        <p>Cambiar de contraseña</p>
        <form onSubmit={onSubmit}>
          <div className="user-box">
            <label>Nueva contraseña</label>
            <div className="password-input-container">
              <input type={showPassword ? "text" : "password"} required />
              <FontAwesomeIcon
                className="password-icon"
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <div className="user-box">
            <label>Confirmar contraseña</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                required
              />
              <FontAwesomeIcon
                className="password-icon"
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <div className="centerButton">
            <button type="submit">Inicia sesión</button>
          </div>
        </form>
      </div>
    </div>
  );
}
