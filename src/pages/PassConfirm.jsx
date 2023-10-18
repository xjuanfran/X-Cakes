import "../styles/register.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
//import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function PassConfirm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const { resetPass } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  //Get token from url params for reset password(necesary for backend)
  const token = new URLSearchParams(useLocation().search);
  //console.log(token.get("token"));

  const onSubmit = handleSubmit((data) => {
    //Take the data from for compare the input password and the confirm password are the same
    const password = data.password;
    const newPassword = data.newPassword;

    //Compare the passwords
    if(password !== newPassword){
      alert("Las contraseñas no coinciden");
      return;
    }
    //Delete the value of the first input in the json data sending , because the backend only need the newPassword
    delete data.password;

    //Add the token to the json data sending
    data.token = token.get("token");
    //console.log(data);
    resetPass(data);
  });

  return (
    <div className="containerEver">
      <div className="pass-box">
        <h2>X Cakes</h2>
        <p>Cambiar de contraseña</p>
        <form onSubmit={onSubmit}>
          <div className="user-box">
            <label>Nueva contraseña</label>
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
          <div className="user-box">
            <label>Confirmar contraseña</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                {...register("newPassword")}
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
            <button type="submit">Cambiar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
