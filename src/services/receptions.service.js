import { getConnection } from '../config/database.js'; // Ajusta la ruta si es distinta
import { CustomError, handleServiceError  } from '../errors/main.error.js';
import {receptionsQueries} from "../queries/main.queries.js";
import {FIND_ORDER_BY_NUMBER, GET_ORDERS_BY_NUMBER, GET_KITS_BY_ORDER} from "../queries/receptions.query.js";

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

/*export const getOrderByPoNumber = async (poNumber) => {
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

}*/

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

export const getOrderByPoNumber = async (poNumber) => {
    try {
        const pool = await getConnection();

        // 1. Traer artículos
        const articlesResult = await pool
            .request()
            .input('PONumber', poNumber)
            .query(GET_ORDERS_BY_NUMBER);

        // 2. Traer componentes (kits)
        const kitsResult = await pool
            .request()
            .input('PONumber', poNumber)
            .query(GET_KITS_BY_ORDER);

        const articulos = articlesResult.recordset;
        const kits = kitsResult.recordset;

        // 3. Reestructurar
        const estructura = articulos.map(articulo => {
            const componentes = kits
                .filter(k => k.NumeroArticulo === articulo.NumeroArticulo)
                .map(k => ({
                    Componente: k.Componente,
                    Descripcion: k.DescripcionComponente
                }));
            return {
                ...articulo,
                EsKit: componentes.length > 0,
                Componentes: componentes
            };
        });

        return estructura;

    } catch (error) {
        handleServiceError(error);
    }
}