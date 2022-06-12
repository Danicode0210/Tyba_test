
import { Request, Response } from "express"


import { SearchRestaurantsService } from "../services/searchRestaurantsService";

const searchrestaurantsService: SearchRestaurantsService = new SearchRestaurantsService();

export const restaurants:any = async (_req: Request, res: Response) => {
    try {

        let responseService: any = await searchrestaurantsService.searchByCoords()
        res.status(200).json(
            {
                message: responseService,
                error: false
            }
        )

    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                message: "Something has happened 😫",
                error: true
            }
        )
    }

}










