const {Country, Type, Basket} = require ('../models/models')
const ApiError = require('../error/ApiError')
const {query} = require("express");
class CountryController {
    async create(req, res) {
        const {name} = req.body
        const  country = await  Country.create({name})
        return res.json(country)
    }

    async getAll(req, res) {
        const countries = await Country.findAll()
        return res.json(countries)
    }
    async export(req, res) {
        await query("COPY countries TO 'C:\\Users\\Public\\countries.csv' DELIMITER ',' CSV HEADER", {
            model: Country,
            mapToModel: true
        })

        return res.json({message: 'Export successed'})
    }

}

module.exports = new CountryController()