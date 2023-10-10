import "../styles/recoveryPass.css";
import { set, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { React, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const { recoveryPass, isSendEmail } = useAuth();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    // Asegúrate de marcar la función como asíncrona
    await recoveryPass(data); // Espera a que la función recoveryPass termine

    // Marca que el formulario ha sido enviado
    setIsFormSubmitted(true);
  });

  useEffect(() => {
    if (isFormSubmitted) {
      if (isSendEmail) {
        toast.success("Se ha enviado un correo electrónico a tu cuenta");
      } else {
        toast.error(
          "Por favor, verifique la dirección de correo electrónico e inténtelo de nuevo"
        );
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
      <ToastContainer/>
    </div>
  );
}
