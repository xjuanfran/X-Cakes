import React, { useEffect, useState } from "react";
import { productsRequest } from "../api/auth";
import Card from "../components/Card";
import "../styles/cupCakes.css";
import Footer from "../components/Footer";

export default function CupCakes() {
  const [products, setProducts] = useState([]);
  const [cardsLoaded, setCardsLoaded] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await productsRequest();
      console.log(res.data);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      setCardsLoaded(true);
    }
  }, [products]);

  const categories = products.reduce((acc, product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);

  return (
    <div className="containercat">
      {cardsLoaded ? (
        <>
          {categories.map((category) => {
            let message = '';

            switch (category) {
              case 'Torta':
                message = '¡Celebra momentos especiales con nuestras irresistibles tortas!';
                break;
              case 'Personal':
                message = 'Saborea la felicidad en pequeñas porciones con nuestros deliciosos pastelitos individuales.';
                break;
              case 'Ponque':
                message = 'Disfruta de la magia en cada porción de nuestros ponqués.';
                break;
              default:
                message = category;
                break;
            }

            return (
              <div key={category} className="container">
                <h2 className="category-heading">
                  {message}
                </h2>
                <div className="row">
                  {products
                    .filter((product) => product.category === category)
                    .map((product) => (
                      <div key={product.productId} className="col-md-4">
                        <Card
                          productId={product.productId}
                          title={product.name}
                          image={product.urlImage}
                          name={product.name}
                          description={product.description}
                          price={product.price}
                        />
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Footer />
    </div>
  );
}
