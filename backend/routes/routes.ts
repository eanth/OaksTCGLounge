import { Router } from 'express';
import index from './index.js';
import cardRoutes from './cardRoutes.js'

const routes = Router()
.use('/', index)
.use('/cards', cardRoutes)

export default routes