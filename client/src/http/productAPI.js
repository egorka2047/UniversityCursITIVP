import {$authHost, $host} from "./index";
import jwt_decode, {jwtDecode} from "jwt-decode";


export const updateCar = async (id, price) => {
    const { data } = await $authHost.put('api/car', { id, price });
    return data;
};

export const deleteCar = async (id) => {
    const { data } = await $authHost.delete('api/car/' + id);
    return data;
};

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createCountry = async (country) => {
    const {data} = await $authHost.post('api/country', country)
    return data
}

export const fetchCountries = async () => {
    const {data} = await $host.get('api/country')
    return data
}

export const createCar = async (car) => {
    const {data} = await $authHost.post('api/car', car)
    return data
}

export const fetchCars = async (typeId, countryId, page, limit = 5) => {
    const {data} = await $host.get('api/car',{params: {
        typeId, countryId, page, limit}})
    return data
}

export const fetchOneCar = async (id) => {
    const {data} = await $host.get('api/car/' + id)
    return data
}

export const addToBasket = async (userId, carId, quantity) => {
    const {data} = await $authHost.post('api/basket/addToCart', {userId, carId, quantity})
    return data
}
export const fetchBasket = async (id) => {
    const {data} = await $authHost.get('api/basket/getCartContents/' + id)
    return data
}
export const removeFromBasket = async (id) => {
    const {data} = await $authHost.delete(`api/basket/delete/` + id);
    return data;
}

export const exportProducts = async () => {
    const { data } = await $authHost.get('api/car/table/export')
    return data
}
