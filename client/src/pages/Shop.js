import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import CountryBar from '../components/CountryBar';
import ProductList from '../components/ProductList';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchCountries, fetchCars, fetchTypes } from '../http/productAPI';
import Pages from '../components/Pages';

const Shop = observer(() => {
  const { product } = useContext(Context);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data));
    fetchCountries().then((data) => product.setCountries(data));
    fetchCars(null, null, 1, 6).then((data) => {
      product.setCars(data.rows);
      product.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchCars(product.selectedType.id, product.selectedCountry.id, product.page, 6).then((data) => {
      product.setCars(data.rows);
      product.setTotalCount(data.count);
    });
  }, [product.page, product.selectedType, product.selectedCountry]);

  const handleConsultationClick = () => {
    alert('Контакты для консультации: Телефон: 8029885566, Email: cardealer@gmail.com');
  };

  const handleFindDealerClick = () => {
    window.location.href = 'https://yandex.by/maps/org/porsche_tsentr_minsk/34898351633/?ll=27.711864%2C53.951580&z=15.47';
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <TypeBar />
          <Button className="mt-3" onClick={handleConsultationClick}>
            Получить контакты для консультации
          </Button>
          <Button className="mt-3" onClick={handleFindDealerClick}>
            Найти дилера
          </Button>
        </Col>
        <Col md={9}>
          <CountryBar />
          <ProductList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
