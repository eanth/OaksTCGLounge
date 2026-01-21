import * as exp from 'express';
import { Pool } from 'pg';
import 'dotenv/config';
import { seedDatabase } from './backend/seedScript.js';

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
});

seedDatabase(pool);




