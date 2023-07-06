import "../styles/register.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"

export default function Register() {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isAuthenticated, errors: registerErrors } = useAuth();

  useEffect(() => {
    if (isAuthenticated)
      window.location.replace("/login");
  }, [isAuthenticated])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = handleSubmit(async (values) => {
    signUp(values);
  });

  const handleButton = () => {
    window.location.href = "http://localhost:3000/api/v1/auth/login/google";
  };

  return (
      <div className="containerEver">
        <div className="register-box">
        <h2>Regístrate</h2>
        {
          registerErrors.length === 50 && (
            <p style={{ color: 'white', fontSize: '15px', background: '#f36273', borderRadius: '7px' }}>
              El teléfono debe tener 10 dígitos
            </p>
          )
        }
        {
          registerErrors.length === 56 && (
            <p style={{ color: 'white', fontSize: '15px', background: '#f36273', borderRadius: '7px' }}>
              La contraseña debe tener al menos 8 caracteres
            </p>
          )
        }
        {
          registerErrors.length === 16 && (
            <p style={{ color: 'white', fontSize: '15px', background: '#f36273', borderRadius: '7px' }}>
              El correo electrónico o el teléfono ya están registrados, por favor intente con otros datos
            </p>
          )
        }
        {
          registerErrors.length === 108 && (
            <p style={{ color: 'white', fontSize: '15px', background: '#f36273', borderRadius: '7px' }}>
              La contraseña debe tener al menos 8 caracteres y el numero de teléfono debe tener 10 dígitos.
            </p>
          )

        }
        {
          registerErrors.length === 121 && (
            <p style={{ color: 'white', fontSize: '15px', background: '#f36273', borderRadius: '7px' }}>
              La longitud de la contraseña debe tener al menos 8 caracteres y la el teléfono debe tener 10 dígitos.
            </p>
          )
        }
        {
          registerErrors.length === 63 && (
            <p style={{ color: 'white', fontSize: '15px', background: '#f36273', borderRadius: '7px' }}>
              El telefono debe tener 10 dígitos
            </p>
          )
        }
        <form onSubmit={onSubmit}>
          <div className="user-box">
            <input
              type="text"
              {...register("firstName")}
              placeholder="Nombre completo"
              required
            />
          </div>
          <div className="user-box">
            <input
              type="text"
              {...register("lastName")}
              placeholder="Apellido"
              required
            />
          </div>
          <div className="user-box">
            <input
              type="email"
              {...register("email")}
              placeholder="Correo electrónico"
              required
            />
          </div>
          <div className="user-box">
            <input
              type="number"
              {...register("phone")}
              placeholder="Teléfono"
              required
            />
          </div>
          <div className="user-box">
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                {...register("userPassword")}
                placeholder="Contraseña"
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
            <button type="submit">Registrarse</button>
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
        <div className="login-back">
          <p>
            ¿Ya tienes una cuenta? &nbsp;
            <Link className="fontStyle" to="/login">
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
      </div>
  );
}
