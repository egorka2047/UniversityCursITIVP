import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {Navbar, Spinner} from "react-bootstrap";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import Basket from "./pages/Basket";
import {set} from "mobx";
import ProductList from "./components/ProductList";

const App = observer(() => {

    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            check().then(data => {
                user.setUser(data)
                user.setIsAuth(true)
            }).finally(()=> setLoading(false))
        }, 1000)
    }, []);

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
      <BrowserRouter>
          <NavBar />
        <AppRouter />
      </BrowserRouter>
  )
});
export default App;
