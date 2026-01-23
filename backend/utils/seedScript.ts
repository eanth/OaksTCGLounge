import { Pool } from 'pg';
import * as fs from 'fs';
import path from 'path';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import type { PokemonCard } from '../types/pokemonCard.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function seedDatabase(pool: Pool) {
    try {

        let count: number = 0;

        console.log("Seeding Base set in the database please wait...");

        await pool.query(
            `DROP TABLE IF EXISTS cards CASCADE;`
        )

        await pool.query(`
                CREATE TABLE IF NOT EXISTS cards (
                    id SERIAL PRIMARY KEY,
                    set_name VARCHAR(255),
                    type VARCHAR(50),
                    id_no INTEGER ,
                    set_no VARCHAR(15),
                    name VARCHAR(255),
                    energy_type VARCHAR(255),
                    hp INTEGER,
                    rarity VARCHAR(50),
                    image TEXT,
                    UNIQUE (set_name, id_no)
                );
            `);

        console.log(path.join(__dirname, 'base-set-seed.json'));
        const rawData = fs.readFileSync(path.join(__dirname, './base-set-seed.json'), 'utf-8');
        const cards: PokemonCard[] = JSON.parse(rawData);

        for (const card of cards) {
            const query = `
                INSERT INTO cards (set_name, type, id_no, set_no, name, energy_type, hp, rarity, image)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                ON CONFLICT (set_name, id_no)
                DO UPDATE SET
                    name = EXCLUDED.name,
                    hp = EXCLUDED.hp,
                    energy_type = EXCLUDED.energy_type,
                    image = EXCLUDED.image;
            `;

            const values = [
                card.set_name,
                card.type,
                parseInt(card.id_no),
                card.set_no,
                card.name,
                card.energy || null,
                card.hp ? parseInt(card.hp) : null,
                card.rarity,
                card.image
            ];

            await pool.query(query, values)
            count++;
        }
        console.log(`Base set db seed completed ${count} cards are now registered`)
    } catch (err) {
        console.error("Error occured during seeding attempt:", err);
    }
}