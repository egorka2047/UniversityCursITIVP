import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const NavBar = observer( () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut =() => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to={SHOP_ROUTE} style={{color: 'white'}} >Car Dealer</NavLink>
                 {user.isAuth ?
                    <Nav className="ms-auto" style = {{color: 'white'}} >
                        {user.user.role === "ADMIN" && (
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(ADMIN_ROUTE)}
                            className="ms-2"
                        >
                            Админ панель
                        </Button>
                            )}
                        <Button
                            variant={"outline-light"}
                            onClick={()=> logOut()}
                            className="ms-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ms-auto" style = {{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
            }
                {user.isAuth && (
                    <NavLink className="ms-auto" to={BASKET_ROUTE} style={{ color: 'white' }}>
                        Корзина
                    </NavLink>
                )}
            </Container>
        </Navbar>
    );
});

export default NavBar;