import express from 'express';
import { Pool } from 'pg';
import 'dotenv/config';
import { seedDatabase } from './backend/seedScript.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = Number(process.env.EXPRESS_PORT) || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
});

async function startServer() {
    try {
        await pool.query("SELECT NOW()");
        console.log("PostgreSQL Database connection established.")

        await seedDatabase(pool);

        app.listen(PORT, () => {
            console.log(`Oak's TCG Cafe server is now live at http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error("Server failed to start:", error);
        process.exit(1);
    }
}

startServer();

app.use(express.static(path.join(__dirname, '../public')));


app.get('/api/cards', async(req, res) => {
    const result = await pool.query('SELECT * FROM cards ORDER BY id_no ASC');
    res.json(result.rows);
})