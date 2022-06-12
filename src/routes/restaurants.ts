import { Router } from "express";
const router: Router = Router()

import { validateToken } from "../libs/validateToken";
import { restaurants } from '../controllers/restaurants.controller';


router.get('/restaurants' , restaurants ,validateToken)

export default router;