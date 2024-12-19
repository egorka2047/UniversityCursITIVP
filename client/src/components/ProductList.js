import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductList = observer(() => {
    const { product } = useContext(Context);

    return (
        <Row className="mt-4">
            {product.Cars.map(car => (
                <Col md={4} className="mb-4" key={car.id}>
                    <Link to={`/product/${car.id}`} style={{ textDecoration: 'none' }}> 
                        <Card style={{ width: '100%' }}>
                            <Card.Img
                                variant="top"
                                src={process.env.REACT_APP_API_URL + car.img}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title>{car.name}</Card.Title>
                                <Card.Text>
                                    Цена: {car.price} €
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
    );
});

export default ProductList;
