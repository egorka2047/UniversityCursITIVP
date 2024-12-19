import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Col, Row} from "react-bootstrap";

const CountryBar = observer(() => {
    const {product} = useContext(Context)

    return (
        <Row className="d-flex">
            {product.Countries.map(country =>
                <Col className={"col-md-2"}>
                <Card
                style={{cursor: 'pointer'}}
                key = {country.id}
                className="p-3"
                onClick={() => product.setSelectedCountry(country)}
                border={country.id === product.selectedCountry.id ? 'danger' : 'light'}
                >
                    {country.name}
                </Card>
                </Col>
            )}
        </Row>
    );
});

export default CountryBar;