const { Basket, BasketCar, Car } = require('../models/models');
const ApiError = require('../error/ApiError');
const {query} = require("express");

class BasketController {
    async addToCart(req, res, next) {
        try {
            const { userId, carId, quantity } = req.body;

            let basket = await Basket.findOne({
                where: { userId: userId },
                include: [BasketCar],
            });

            if (!basket) {
                basket = await Basket.create({ userId: userId });
            }
            console.log(basket)
            const existingProduct = basket.basket_cars.find(item => item.carId === carId);

            if (existingProduct) {
                existingProduct.quantity += quantity;
                await existingProduct.save();
            } else {
                await BasketCar.create({ basketId: basket.id, carId: carId, quantity });
            }

            return res.json({ message: 'Product added to cart successfully' });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getCartContents(req, res, next) {
        try {
            const { userId } = req.params;

            let basket = await Basket.findOne({
                where: { userId: userId },
                include: [{ model: BasketCar, include: [Car] }],
            });

            if (!basket) {
                return res.json({ message: 'Cart is empty' });
            }

            return res.json(basket.basket_cars);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async deleteItem(req, res, next) {
        try {
            const Id = req.params.id; 

            
            const basketCar = await BasketCar.findOne({
                where: { id: Id },
            });

            
            if (!basketCar) {
                return next(ApiError.notFound('Товар в корзине не найден'));
            }
            
            await basketCar.destroy();

            return res.json({ message: 'Товар успешно удален из корзины' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BasketController();
