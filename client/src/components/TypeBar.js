import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import {type} from "@testing-library/user-event/dist/type";

const TypeBar = observer(() => {
    const {product} = useContext(Context)
    return (
        <ListGroup>
            {product.Types.map(type =>
             <ListGroup.Item
                 style={{cursor: 'pointer'}}
                 active={type.id === product.selectedType.id}
                 onClick={() => product.setSelectedType(type)}
                 key = {type.id}
             >

                 {type.name}
             </ListGroup.Item>
            )}
        </ListGroup>
    );
});
export default TypeBar;