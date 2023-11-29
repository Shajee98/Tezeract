import "./models/Relations"

import express from "express"
import sequelize from "./config/db.config"
import { handleErrors } from "./utils/errorHandling.utils"
import bodyParser from 'body-parser'
import publicRoutes from "./appdata/base-routes/Routes.public"

var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api', publicRoutes)
app.use(handleErrors)

// error handler

const initDB = async () => {
  // Check DB connection
  try {
    await sequelize.authenticate()
    //Uncomment for resetting the DB in dev environment
    // await sequelize.sync({ force: true });
    await sequelize.sync({ alter: true });
    console.log("Database connection has been established successfully.")
  } catch (error) {
    console.error(`Unable to connect to database: ${error}`)
  }
}

initDB()

export default app
