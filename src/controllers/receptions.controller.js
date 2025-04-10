import {receptionsService} from "../services/main.services.js";
import {responses} from "../config/main.config.js";

export const getOrders = async (req, res, next) => {
    try {
        const response = await receptionsService.getOrders();
        if(response){
            return responses.success(req, res, response)
        }
    } catch (e) {
        next(e)
    }

}

export const getOrderByNumber = async (req, res, next) => {
    try {
        const {poNumber} = req.query
        const response = await receptionsService.getOrderByPoNumber(poNumber)
        if(response){
            return responses.success(req, res, response)
        }
    } catch (e) {
        next(e)
    }
}

export const findOrdersByNumber = async (req, res, next) => {
    try {
        const {poNumber} = req.query
        const response = await receptionsService.findOrdersByNumber(poNumber)
        if(response){
            return responses.success(req, res, response)
        }
    } catch (e) {
        next(e)
    }
}