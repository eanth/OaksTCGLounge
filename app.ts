import express from 'express';
import { pool } from './backend/config/db.js'
import 'dotenv/config';
import { seedDatabase } from './backend/utils/seedScript.js';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './backend/routes/routes.js';

const app = express();

const PORT = Number(process.env.EXPRESS_PORT) || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')));
app.use(routes);


async function startServer() {
    try {
        await pool.query("SELECT NOW()");
        console.log("PostgreSQL Database connection established.")

        await seedDatabase(pool);

        app.listen(PORT, () => {
            console.log(`Oak's TCG Lounge is now live at http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error("Server failed to start:", error);
        process.exit(1);
    }
}

startServer();