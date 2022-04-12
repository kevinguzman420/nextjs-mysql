import { createPool } from 'mysql2/promise';

// create connections pool
const pool = createPool({
    host: 'localhost',
    user: 'kevinguzman',
    password: 'kevinguzman',
    port: 3306,
    database: 'productsdb',
});

export { pool };