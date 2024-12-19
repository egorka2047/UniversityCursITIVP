import React, { useState } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import CreateCountry from '../components/modals/CreateCountry';
import CreateType from '../components/modals/CreateType';
import CreateProduct from '../components/modals/CreateProduct';
import EditCarModal from '../components/modals/EditCarModal';
import { deleteCar, fetchCars } from '../http/productAPI';
import { exportUsers } from "../http/userAPI";
import { exportProducts } from "../http/productAPI";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [productVisible, setProductVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [cars, setCars] = useState([]);

    const loadCars = async () => {
        const data = await fetchCars(null, null, 1, null);
        setCars(data.rows);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить автомобиль?')) {
            await deleteCar(id);
            loadCars(); 
        }
    };

    const handleEdit = (car) => {
        setSelectedCar(car);
        setEditVisible(true);
    };

    const exportData = async () => {
        await exportProducts();
        await exportUsers();
    };

    return (
        <Container className="d-flex flex-column">
            {/* Кнопки управления */}
            <Button
                variant="outline-dark"
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Добавить бренд авто
            </Button>
            <Button
                variant="outline-dark"
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Добавить страну поставщика
            </Button>
            <Button
                variant="outline-dark"
                className="mt-4 p-2"
                onClick={() => setProductVisible(true)}
            >
                Добавить авто
            </Button>
            <Button
                variant="outline-dark"
                className="mt-4 p-2"
                onClick={exportData}
            >
                Экспортировать таблицы с продуктами и пользователями
            </Button>
            <Button
                variant="outline-dark"
                className="mt-4 p-2"
                onClick={loadCars}
            >
                Загрузить автомобили
            </Button>

            
            <Row className="mt-4">
                {cars.map((car) => (
                    <Col md={4} className="mb-4" key={car.id}>
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
                                <Button
                                    variant="outline-primary"
                                    className="mr-2"
                                    onClick={() => handleEdit(car)}
                                >
                                    Редактировать
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => handleDelete(car.id)}
                                >
                                    Удалить
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
                       
            <CreateCountry show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            {selectedCar && (
                <EditCarModal
                    show={editVisible}
                    onHide={() => setEditVisible(false)}
                    car={selectedCar}
                />
            )}
        </Container>
    );
};

export default Admin;