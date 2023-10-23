import "../styles/recoveryPass.css";
import { set, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { React, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const { recoveryPass, isSendEmail } = useAuth();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // This variable is used to show loader spinner when the user click the button "Enviar" in the form
  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    await recoveryPass(data);
    // This is for show the toast message when the user click the button "Enviar" in the form depending if the email is correct or not
    setIsFormSubmitted(true);

    setLoading(false);
  });

  useEffect(() => {
    if (isFormSubmitted) {
      if (isSendEmail) {
        toast.success(
          "Se ha enviado el enlace de reuperación de contraseña a su correo electrónico"
        );
        // This variable is used to count the time before redirecting to the home page only after receiving a response from the backend
        let auxShow = true;
        if (auxShow) {
          setTimeout(() => {
            window.location.replace("/");
          }, 5500);
        }
      } else {
        toast.error(
          "Por favor, verifique la dirección de correo electrónico e inténtelo de nuevo"
        );
        // This variable is used to count the time before refresh the page only after receiving a response from the backend
        let auxShow = true;
        if (auxShow) {
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        }
      }
    }
  }, [isSendEmail, isFormSubmitted]);

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
            <button type="submit" className={isFormSubmitted ? "button-disable": "button"} disabled={isFormSubmitted ? true : false}>{loading ? <CircularProgress style={{ color: "white"}} size={23}/> : "Enviar"}</button>
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
      <ToastContainer autoClose={isSendEmail ? 5500 : 3500} closeButton={false} />
    </div>
  );
}
