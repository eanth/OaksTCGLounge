import { Router } from 'express';
import index from './index.js';
import cardRoutes from './cardRoutes.js';
import cors from 'cors';


const routes = Router()
.use('/', index)
.use('/cards', cardRoutes)

const apiRouter = Router()
.use(cors())
.use('/api', routes)

export default apiRouter