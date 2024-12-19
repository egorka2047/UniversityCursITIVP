import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createCountry, createType} from "../../http/productAPI";

const CreateCountry = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addCountry = () => {
        createCountry({name: value}).then(data => {
            setValue('')
            onHide()
        })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить страну поставщика авто
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название страны поставщика"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addCountry}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCountry;