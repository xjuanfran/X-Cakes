import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import "../styles/profile.css";
import Footer from "../components/Footer";

export default function Profile() {
  const { user } = useAuth();
  const [tokenInfo, setTokenInfo] = useState(null);

  const profilePic =
    "https://cdn-icons-png.flaticon.com/512/1033/1033396.png?w=740&t=st=1687752473~exp=1687753073~hmac=0d64ea1112ad1d96de34ad8917b2badb887ec29e2785c6d6152d2d4141ad4db4";

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)userData\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setTokenInfo(decodedToken);
        console.log(decodedToken);
      } catch (error) {
        console.log("Error al decodificar el token:", error.message);
        return;
      }
    } else {
      console.log("No se encontró el token en la cookie.");
      return;
    }
  }, [user]);

  return (
    <div className="profile-container">
      <div className="center-card">
        <div className="card-container">
          <div className="card-image">
            <img src={profilePic} alt="Foto de perfil" />
          </div>
          <div className="card-details">
            <h5>Datos personales</h5>
            <p>
              Nombre y apellido:{" "}
              {`${tokenInfo?.firstname} ${tokenInfo?.lastName}`}
            </p>
            <p>Correo electrónico: {tokenInfo?.email}</p>
            <p>Telefono: {tokenInfo?.phone}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
