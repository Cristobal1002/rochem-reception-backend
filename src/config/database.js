import sql from 'mssql';
import 'dotenv/config';

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

let pool;

export const getConnection = async () => {
    try {
        if (!pool) {
            pool = await sql.connect(dbConfig);
            console.log('✅ Pool SQL Server creado');
        }
        return pool;
    } catch (err) {
        console.error('❌ Error al conectar con SQL Server:', err);
        throw err;
    }
};

export { sql };