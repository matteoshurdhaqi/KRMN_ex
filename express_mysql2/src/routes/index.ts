import { Router } from 'express'
import usersRouter from './userRouter'

const router = Router();

router.use('/users', usersRouter)

export default router;

