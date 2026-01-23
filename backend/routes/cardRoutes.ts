import { Router } from 'express';
import * as cardsAPI from '../api/cardsAPI.js';
const router = Router();

router.get("/", (req, res) =>{
    res.send("temp");
});

router.get("/all", async (req, res) => {
    const result = await cardsAPI.getAllCards();
    res.send(result);
});

router.get("/type/:type", async(req,res) => {
    const result = await cardsAPI.getCardsByType(req.params.type);
    res.send(result);
})

export default router
