import express from "express";
import {receptionsController} from "../controllers/main.controllers.js";
import {findOrdersByNumber} from "../controllers/receptions.controller.js";
export const receptions = express.Router()

receptions.get(`/get-order`, receptionsController.getOrderByNumber)
receptions.get('/orders', receptionsController.findOrdersByNumber);