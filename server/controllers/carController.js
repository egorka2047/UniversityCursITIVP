const uuid = require('uuid')
const path = require('path')
const {Car,CarInfo, Basket} = require('../models/models')
const ApiError = require('../error/ApiError')
const sequelize = require('../db')

class CarController {
    async create(req, res, next) {
        try {
            let {name, price, typeId, countryId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname,'..', 'static', fileName))

            const car = await Car.create({name, price, typeId, countryId, img: fileName})

            if (info){
                info = JSON.parse(info)
                info.forEach(i =>
                    CarInfo.create({
                        title: i.title,
                        description: i.description,
                        carId: car.id
                    })
                )
            }

            return res.json(car)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
        
    }

    async update(req, res, next) {
        try {
            const { id, price } = req.body; 
            const car = await Car.findByPk(id); 
    
            if (!car) {
                return next(ApiError.badRequest('Автомобиль не найден'));
            }
    
            car.price = price; 
            await car.save(); 
    
            return res.json({ message: 'Цена обновлена', car });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params; 
            const car = await Car.findByPk(id); 
    
            if (!car) {
                return next(ApiError.badRequest('Автомобиль не найден'));
            }
    
            await car.destroy(); 
            return res.json({ message: 'Автомобиль удален' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
       let  {countryId, typeId, limit, page, searchQuery} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let cars;
        if (!countryId && !typeId) {
            cars = await Car.findAndCountAll({limit, offset})
        }
        if (countryId && !typeId) {
            cars = await Car.findAndCountAll({where: {countryId}, limit, offset})
        }
        if (!countryId && typeId) {
            cars = await Car.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (countryId && typeId) {
            cars = await Car.findAndCountAll({where: {countryId, typeId}, limit, offset})
        }
        return res.json(cars)
    }
    async getOne(req, res){
        const {id} = req.params
        const car = await Car.findOne(
            {
                where: {id},
                include: [{model: CarInfo, as: 'info'}]
            }
        )
        return res.json(car)
    }
    async export(req, res) {
        await sequelize.query("COPY cars TO 'C:\\Users\\Public\\cars.csv' DELIMITER ',' CSV HEADER", {
            model: Car,
            mapToModel: true
        })

        return res.json({message: 'Export successed'})
    }
}

module.exports = new CarController()