import pkg from 'pg';
import { db } from './config.js';

const { Pool } = pkg;

const pool = new Pool({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    port: db.port
})

export {
    pool
}