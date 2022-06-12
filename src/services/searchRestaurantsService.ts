import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
//import { dataRestaurant } from "../interfaces/dataRestaurant";

export class SearchRestaurantsService {

  public async searchByCoords() {

    return new Promise((resolve, reject) => {

      let url = `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:-76.0208666,5.8500342,1000&bias=proximity:-76.0208666,5.8500342&limit=20&apiKey=${process.env.API_KEY}`
      let config: AxiosRequestConfig = {
        method: 'get',
        url: url,
        headers: {}
      };

      axios(config)
        .then((response: AxiosResponse) => {
          if (response.status != 200) {
            reject(response?.data)
          }
          resolve(response.data)
        })
        .catch((error) => {
          reject(error?.response?.data)
        });
    })
  }
}