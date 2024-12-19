const sequelize = require('../db')
const {DataTypes} = require ('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique:true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketCar = sequelize.define('basket_car',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
})

const Car = sequelize.define('car',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Country = sequelize.define('country',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const CarInfo = sequelize.define('car_info',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})
const TypeCountry = sequelize.define('type_country',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketCar)
BasketCar.belongsTo(Basket)

Car.belongsToMany(Basket, {through: BasketCar})
Basket.belongsToMany(Car, {through: BasketCar})

Type.hasMany(Car)
Car.belongsTo(Type)

Country.hasMany(Car)
Car.belongsTo(Country)

Car.hasMany(BasketCar)
BasketCar.belongsTo(Car)

Car.hasMany(CarInfo,{as:'info'})
CarInfo.belongsTo(Car)

Type.belongsToMany(Country,{through: TypeCountry })
Country.belongsToMany(Type, {through: TypeCountry })

module.exports = {
    User,
    Basket,
    BasketCar,
    Car,
    Type,
    Country,
    TypeCountry,
    CarInfo
}