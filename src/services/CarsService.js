import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CarsService {

    async getCars() {
        let res = await api.get('api/cars')
        logger.log(res.data)
        AppState.cars = res.data
    }

    async createCar(data) {
        const res = await api.post('api/cars', data)
        logger.log(res.data)
        AppState.cars.push(res.data)
    }

    async removeCar(id) {
        const res = await api.delete('api/cars/' + id)
        logger.log(res)
        AppState.cars = AppState.cars.filter(c => c.id != id)
    }

    async getCarById(id) {
        const res = await api.get('api/cars/' + id)
        logger.log(res.data)
        AppState.activeCar = res.data
        AppState.activeCar.price = AppState.activeCar.price.toLocaleString("en-US")
    }

}
export const carsService = new CarsService()