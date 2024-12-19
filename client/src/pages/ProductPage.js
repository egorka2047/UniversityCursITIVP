import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { addToBasket, fetchOneCar } from '../http/productAPI';
import { Context } from '../index';
import { LOGIN_ROUTE } from '../utils/consts';

const ProductPage = () => {
  const [product, setProduct] = useState({ info: [] });
  const { user, basket } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    fetchOneCar(id).then((data) => setProduct(data));
  }, [id]);

  const handleAddToBasket = () => {
    if (user && user.user.id) {
      addToBasket(user.user.id, product.id, 1);
      alert('Товар добавлен в корзину');
    } else {
      alert('Для добавления товара в корзину вам нужно войти в систему.');
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={5}>
          <Image width={500} height={300} src={process.env.REACT_APP_API_URL + product.img} />
        </Col>
        <Col md={4}>
          <Row>
            <h2>{product.name}</h2>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{ width: 500, height: 200, fontSize: 32, border: '5px solid lightgray' }}
          >
            <h3>От: {product.price} Euro</h3>
            {user && user.user && (
              <Button className="mt-4 p-2" variant="success" onClick={handleAddToBasket}>
                Добавить в корзину
              </Button>
            )}
            {!user && (
              <Button
                className="mt-4 p-2"
                variant="outline-primary"
                onClick={() => window.location.href = LOGIN_ROUTE} 
              >
                Для добавления в корзину войдите в систему
              </Button>
            )}
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-1">
        <h1>Описание</h1>
        {product.info.map((info, index) => (
          <Row
            key={info.id}
            style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default ProductPage;
