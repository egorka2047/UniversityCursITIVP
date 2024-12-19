import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../index";
import { fetchBasket, removeFromBasket } from "../http/productAPI";
import { Button, Container, Form, Table, Modal } from "react-bootstrap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Report from '../components/Report';

const Basket = () => {
    const { user, basket, setBasket } = useContext(Context)
    const [basketItems, setBasketItems] = useState([]);
    const [checkout, setCheckout] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [cashOnDelivery, setCashOnDelivery] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [infoMessage, setInfoMessage] = useState('');
    const [orderSubmitted, setOrderSubmitted] = useState(false); 

    useEffect(() => {
        if (user.user.id) {
            fetchBasket(user.user.id).then(data => {
                const updatedBasketItems = data.map(item => ({
                    ...item,
                    ordered: false
                }));
                setBasketItems(updatedBasketItems);
            });
        }
    }, [user.user.id]);

    const handleRemoveFromBasket = async (id) => {
        try {
            await removeFromBasket(id);
            const updatedBasket = await fetchBasket(user.user.id);
            setBasketItems(updatedBasket);
        } catch (error) {
            console.error('Ошибка при удалении товара из корзины:', error.message);
        }
    };

    const handleCheckout = (index) => {
        setBasketItems(prevState => 
            prevState.map((item, idx) => 
                idx === index ? { ...item, ordered: true } : item
            )
        );
        setCheckout(true);
    };

    const handleInfoChange = (e) => {
        setContact(e.target.value);
    };

    const handleCardNumberChange = (e) => {
        setCardNumber(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleCashOnDeliveryChange = () => {
        setCashOnDelivery(!cashOnDelivery);
    };

    const handleOrderSubmit = () => {
        console.log("Заказ отправлен:", { cardNumber, address, cashOnDelivery, basketItems });
        setCheckout(false);
        setOrderSubmitted(true);
    };

    const handleInfoModalClose = () => {
        setShowInfoModal(false);
    };

    const handleInfoClick = () => {
        const messages = [
            "Ожидание администратора",
            "Заявка одобрена, ожидайте звонка от сотрудника",
            "Составление документов",
            "Договор готов к подписанию, для этого необходимо обратиться в ближайший дилер центр"
        ];
        const randomIndex = Math.floor(Math.random() * messages.length);
        setInfoMessage(messages[randomIndex]);
        setShowInfoModal(true);
    };

    return (
        <Container className="mt-3">
            <h2>Корзина</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Наименование</th>
                        <th>Цена</th>
                        <th>Количество</th>
                        <th>Итого</th>
                        <th>Сохранение</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {basketItems &&
                        basketItems.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.car.name}</td>
                                <td>{item.car.price} Euro</td>
                                <td>{item.quantity}</td>
                                <td>{item.quantity * item.car.price} Euro</td>
                                <td>
                                    <PDFDownloadLink className='me-2' document={<Report item={item} />} fileName={'item_' + item.id + '.pdf'}>
                                        {({ blob, url, loading, error }) => (loading ? 'Загрузка отчета...' : 'Сохранить в PDF')}
                                    </PDFDownloadLink>
                                </td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleRemoveFromBasket(item.id)}
                                    >
                                        Удалить
                                    </Button>{' '}
                                    {!item.ordered ? (
                                        <Button
                                            variant="success"
                                            onClick={() => handleCheckout(index)}
                                        >
                                            Заказать
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="info"
                                            onClick={handleInfoClick}
                                        >
                                            Информация
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            {checkout && !orderSubmitted && (
                <div>
                    <h3>Оформление заказа</h3>
                    <Form>
                        <Form.Group controlId="cardNumber">
                            <Form.Label>ФИО</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите ваше ФИО"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label>Адрес проживания</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите ваш адрес"
                                value={address}
                                onChange={handleAddressChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="contact">
                            <Form.Label>Контактные данные</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Оставьте ваши контактные данные для связи"
                                value={contact}
                                onChange={handleInfoChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="cashOnDelivery">
                            <Form.Check
                                type="checkbox"
                                label="Оплата при оформлении договора"
                                checked={cashOnDelivery}
                                onChange={handleCashOnDeliveryChange}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleOrderSubmit} style={{ marginTop: '10px' }}>
                            Оформить заказ
                        </Button>
                    </Form>
                </div>
            )}
            <Modal show={showInfoModal} onHide={handleInfoModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Информация</Modal.Title>
                </Modal.Header>
                <Modal.Body>{infoMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleInfoModalClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Basket;
