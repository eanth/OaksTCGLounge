import { pool } from '../config/db.js';

export async function getAllCards() {
    try {
        let result = (await pool.query("SELECT * FROM cards ORDER BY id_no ASC")).rows;
        return result;
    } catch(error){
        return error;
    }
}

export async function getCardsByType(type: string) {
    try {
        let result = (await pool.query("SELECT * FROM cards WHERE LOWER(energy_type) = LOWER($1) ORDER BY id_no ASC", [type])).rows;
        return result;
    } catch(error){
        return error;
    }
}