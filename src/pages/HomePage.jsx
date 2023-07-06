import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { productsRequest } from '../api/auth';

import Card from '../components/Card';
import Footer from '../components/Footer';
import '../styles/homePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [product, setProduct] = useState(null);
  const [cardsLoaded, setCardsLoaded] = useState(false);

  const InitialImage = 'https://res.cloudinary.com/dmvpidbrt/image/upload/v1687841798/Pastelitos/party_1_nfde0c.png';

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await productsRequest();
      //console.log(res.data);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (product) {
      setCardsLoaded(true);
    }
  }, [product]);

  return (
    <HelmetProvider>
      <Helmet>
        <style>{`body { background-color: #2a9c9d; }`}</style>
      </Helmet>
      <div className="containerHome">
        <div className="poster animate__animated animate__fadeInUp">
          <Link to="/catalogo">
          <img src={InitialImage} alt="poster" />
          </Link>
        </div>
        <div className="container">
          <div className="row">
            {product &&
              product.slice(0, 9).map((item) => (
                <div className="col-md-4" key={item.productId}>
                  <Card
                    productId={item.productId}
                    title={item.name}
                    description={item.description}
                    image={item.urlImage}
                    price={item.price}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      {cardsLoaded && <Footer />}
    </HelmetProvider>
  );
};

export default HomePage;
