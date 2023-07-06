import React, { useEffect, useState } from "react";
import "../styles/shoppingCar.css";
import { useAuth } from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Footer from '../components/Footer';


export default function ShoppingCar() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [tokenInfo, setTokenInfo] = useState(null);
  const { user, generateOrder } = useAuth();
  const navigate = useNavigate();

  const shoppingCar =
    "https://img.freepik.com/iconos-gratis/carrito-compras_318-348000.jpg?size=626&ext=jpg&ga=GA1.1.835223489.1685572680&semt=ais";

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)userData\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setTokenInfo(decodedToken);
        //console.log(decodedToken);
      } catch (error) {
        //console.log("Error al decodificar el token:", error.message);
        return;
      }
    } else {
      //console.log("No se encontró el token en la cookie.");
      return;
    }
  }, [user]);

  useEffect(() => {
    const itemsString = localStorage.getItem("items");
    const items = JSON.parse(itemsString);
    setCartItems(items);

    let cartTotal = 0;
    if (items) {
      items.forEach((item) => {
        cartTotal += item.totalPrice;
      });
    }
    setTotal(cartTotal);
  }, []);

  const handleRemoveItem = (itemTitle) => {
    //Filter the cart items, excluding the item with the specified title
    const updatedItems = cartItems.filter((item) => item.title !== itemTitle);
    //Update the cart items
    setCartItems(updatedItems);
    //Save the updated items in the localStorage
    localStorage.setItem("items", JSON.stringify(updatedItems));
    // Calculate the new total
    let cartTotal = 0;
    if (updatedItems) {
      updatedItems.forEach((item) => {
        cartTotal += item.totalPrice;
      });
    }
    setTotal(cartTotal);
  };

  const handleOrder = async () => {
    console.log("Generando pedido...");
    const objectOrder = {
      products: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      clientId: tokenInfo.sub,
    };
    console.log(objectOrder);

    try {
      const response = await generateOrder(objectOrder);
      console.log(response);
      swal({
        title: "¡Pedido generado!",
        text: "Gracias por su pedido. Estamos procesándolo y nos pondremos en contacto pronto.",
        icon: "success",
        button: "Continuar",
        timer: 20000,
      });
      localStorage.removeItem("items");
      navigate("/");
    } catch (error) {
      console.log(error);
      swal({
        title: "Ups!",
        text: "No hay pasteles disponibles en este momento. ¡Prueba de nuevo más tarde!",
        icon: "error",
        button: "Continuar",
        timer: 20000,
      });
    }
  };

  const handleExplorer = () => {
    navigate("/");
  }

  return (
    <div className="container-shopping">
      <div className="title">
        <h1>Carrito de compras</h1>
        <img
          src={shoppingCar}
          alt="logo-carrito-compras"
          className="logo-cart"
        />
      </div>
      {cartItems?.length > 0 ? (
        <div className="cart-container">
          {cartItems.map((item, index) => (
            <div className="cart-item" key={item.productId}>
              <div className="cart-item-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="cart-item-details">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: ${item.totalPrice}</p>
              </div>
              <div className="cart-item-button">
                <button onClick={() => handleRemoveItem(item.title)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="cart-item">
            <div className="cart-item-details">
              <h5>Total: ${total}</h5>
            </div>
            <div className="cart-item-button">
              <button onClick={handleOrder}>Generar pedido</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-item">
            <div className="cart-item-details center">
              <h2>No hay productos en el carrito</h2>
              <p>¡Hazte un regalo y disfruta de nuestros irresistibles pastelitos! Una experiencia deliciosa te espera.</p>
              <div className="button-align">
              <button onClick={handleExplorer}>Explorar pastelitos</button>
              </div>
            </div>
          </div>
        </div>
      ) }
      <Footer />
    </div>
  );
}
