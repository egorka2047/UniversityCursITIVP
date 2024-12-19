import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateCar } from '../../http/productAPI';

const EditCarModal = ({ show, onHide, car }) => {
    const [price, setPrice] = useState(car.price || '');

    const handleUpdate = async () => {
        try {
            await updateCar(car.id, price); // Отправляем на сервер обновленные данные
            alert('Цена обновлена');
            onHide(); // Закрываем модальное окно
        } catch (e) {
            alert('Ошибка при обновлении');
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать цену автомобиля</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicPrice">
                        <Form.Label>Новая цена</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введите новую цену"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Отмена
                </Button>
                <Button variant="outline-success" onClick={handleUpdate}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditCarModal;