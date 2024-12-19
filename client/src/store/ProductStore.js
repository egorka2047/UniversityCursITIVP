import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._types = []
        this._countries = []
        this._cars = []
        this._selectedType = {}
        this._selectedCountry = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 6
        makeAutoObservable(this)
    }

    setTypes(types){
        this._types = types
    }
    setCountries(countries) {
        this._countries = countries
    }
    setCars(cars) {
        this._cars = cars
    }
    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedCountry(country) {
        this.setPage(1)
        this._selectedCountry = country
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
        get Types(){
        return this._types
    }
    get Countries(){
        return this._countries
    }
    get Cars(){
        return this._cars
    }
    get selectedType(){
        return this._selectedType
    }
    get selectedCountry(){
        return this._selectedCountry
    }
    get totalCount(){
        return this._totalCount
    }
    get page(){
        return this._page
    }
    get limit(){
        return this._limit
    }
}