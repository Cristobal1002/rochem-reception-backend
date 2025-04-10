import { getConnection } from '../config/database.js'; // Ajusta la ruta si es distinta
import { CustomError, handleServiceError  } from '../errors/main.error.js';
import {receptionsQueries} from "../queries/main.queries.js";
import {FIND_ORDER_BY_NUMBER, GET_ORDERS_BY_NUMBER} from "../queries/receptions.query.js";

export const getOrders = async () => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(receptionsQueries.GET_ORDERS_QUERY);
        console.log('resultados', result)
        return result.recordset; // Devuelve los datos directamente

    } catch (error) {
        console.error('❌ Error al obtener órdenes:', error);
        handleServiceError(error);
    }
};

export const getOrderByPoNumber = async (poNumber) => {
    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .input('PONumber', poNumber) // protección contra inyección SQL
            .query(GET_ORDERS_BY_NUMBER);

        return result.recordset;
    } catch (error) {
        handleServiceError(error);
    }

}

export const findOrdersByNumber = async (poNumber) => {
    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .input('searchTerm', poNumber) // protección contra inyección SQL
            .query(FIND_ORDER_BY_NUMBER);

        return result.recordset;
    } catch (error) {
        handleServiceError(error);
    }
}