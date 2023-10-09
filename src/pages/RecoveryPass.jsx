import "../styles/recoveryPass.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { React, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const { recoveryPass, isSendEmail } = useAuth();

  const onSubmit = handleSubmit((data) => {
    recoveryPass(data);
    if (isSendEmail) { //falta, da false cuando escribo un correo que existe(no deberia)
      toast.success("Se ha enviado un correo electrónico a tu cuenta");
    }
    else {
      toast.error("El correo electrónico ingresado no existe");
    }
  });

  return (
    <div className="containerEver">
      <div className="login-box">
        <h2>¿Tienes problemas para iniciar sesión?</h2>
        <p className="message">
          Ingresa tu correo electrónico y te enviaremos un enlace para que
          recuperes el acceso a tu cuenta
        </p>
        <form onSubmit={onSubmit}>
          <div className="user-box">
            <label className="font">Correo electrónico</label>
            <input type="email" {...register("email")} required />
          </div>
          <div className="centerButton">
            <button type="submit">Enviar</button>
          </div>
        </form>
        <div className="register">
          <p className="hola">
            ¿No tienes una cuenta? &nbsp;
            <Link className="fontStyle" to="/register">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
