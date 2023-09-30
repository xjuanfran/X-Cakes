import "../styles/recoveryPass.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Register() {
  const { register, handleSubmit } = useForm();
  const { recoveryPass } = useAuth();


  const onSubmit = handleSubmit((data) => {
    //console.log(data);
    recoveryPass(data);
  });

  return (
    <div className="containerEver">
      <div className="login-box">
        <h2>¿Tienes problemas para iniciar sesión?</h2>
        <p className="message">Ingresa tu correo electrónico y te enviaremos un enlace para que recuperes el acceso a tu cuenta</p>
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
