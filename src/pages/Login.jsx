import "../styles/register.css";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, errors: signInErrors, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signIn(data);
    console.log(data);
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleButton = async() => {
    window.open("http://localhost:3000/api/v1/auth/login/google", "_blank");
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("isAuthenticated", isAuthenticated);
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="containerEver">
      <div className="login-box">
        <h2>Inicia sesión en Benzema Cakes</h2>
        {
          <p
            style={{
              color: "white",
              fontSize: "17px",
              background: "#f36273",
              borderRadius: "7px",
            }}
          >
            {signInErrors}
          </p>
        }
        <form onSubmit={onSubmit}>
          <div className="user-box">
            <label className="font">Correo electrónico</label>
            <input type="email" {...register("email")} required />
          </div>
          <div className="user-box">
            <label>Contraseña</label>
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
            <p>
              <Link className="link" to="/">
                ¿Olvidaste tu contraseña?
              </Link>
            </p>
          </div>
          <div className="centerButton">
            <button type="submit">Inicia sesión</button>
          </div>
        </form>
        <div>
          <button className="googleButton" type="submit" onClick={handleButton}>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google Logo"
            />
            Inicia sesión con Google
          </button>
        </div>
        <div className="register">
          <p className="hola">
            ¿No tienes una cuenta?
            &nbsp;
            <Link className="fontStyle" to="/register">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
