import { Router } from "express";
const router: Router = Router()

import { signUp ,signIn,profile } from '../controllers/auth.controller';
import { validateToken } from '../libs/validateToken';


router.post('/signup',signUp)
router.post('/signin', signIn)
router.get('/profile',profile , validateToken ,profile)




export default router;