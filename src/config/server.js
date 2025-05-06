import express from 'express';
import cors from 'cors';
import {getConnection} from "./database.js";
import {routes} from '../routes/main.routes.js'
import {errorHandlerMiddleware} from "../middleware/main.middleware.js";

const startServer = async () => {
    const port = process.env.SERVER_PORT || 3000;
    const app = express();

    app.use(cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-app-token']
    }));

    app.use(express.json({ limit: '20mb' }));
    app.use(express.urlencoded({ extended: true, limit: '20mb' }));

    routes(app);
    app.use(errorHandlerMiddleware.errorHandler); // Manejador de errores

    app.get('/api/v1/db-status', async (req, res) => {
        try {
            const pool = await getConnection();
            const result = await pool.request().query('SELECT GETDATE() AS currentTime');
            res.json({ status: 'ok', currentTime: result.recordset[0].currentTime });
        } catch (err) {
            res.status(500).json({ status: 'error', error: err.message });
        }
    });

    try {
        await getConnection();
        console.log('✅ Conectado a la base de datos');

        app.listen(port, '0.0.0.0', () => {
            console.log(`🚀 Servidor corriendo en puerto ${port} y accesible en red local`);
        });
    } catch (err) {
        console.error('❌ No se pudo conectar a la base de datos:', err);
        process.exit(1);
    }
};

export default startServer;