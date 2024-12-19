const {Type, Basket} = require ('../models/models')
const ApiError = require('../error/ApiError')
const {query} = require("express");
class TypeController {
    async create(req, res) {
        const {name} = req.body
        const  type = await  Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
    async export(req, res) {
        await query("COPY types TO 'C:\\Users\\Public\\types.csv',' CSV HEADER", {
            model: Type,
            mapToModel: true
        })

        return res.json({message: 'Export successed'})
    }

}
module.exports = new TypeController()