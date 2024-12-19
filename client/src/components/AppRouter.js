import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import Admin from "../pages/Admin";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {/*<Route path='/Admin' element={<Admin/>}/>*/}
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path ={path} element={<Component />} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path = {path} element={<Component />} exact/>
            )}
           <Route path="*" element={<Navigate to={SHOP_ROUTE}/>} />
        </Routes>
    );
};

export default AppRouter;
