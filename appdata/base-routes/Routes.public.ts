import express from "express"
import employeeRoutes from "../api/v1/public/Employees/routes/Employees"

const publicRouter = express.Router()
publicRouter.use('/v1/employees', employeeRoutes)

export default publicRouter