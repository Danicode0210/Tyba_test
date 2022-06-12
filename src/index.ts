
//Archive .ENV
import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
const app = express()

import morgan from 'morgan'

//Authentication routes
import authRoutes from './routes/auth'

//Restaurants route
import restaurantRoutes from './routes/restaurants'

//Database
import './database/database'



const PORT = process.env.PORT || 4000



//Middlewares
app.use(morgan('dev'))
app.use(express.json())


//Authentication routes

app.use('/api/auth', authRoutes)

//
app.use('/api', restaurantRoutes)


app.listen(PORT,() =>{
    console.log(`Server running in port ${PORT}`)
})
