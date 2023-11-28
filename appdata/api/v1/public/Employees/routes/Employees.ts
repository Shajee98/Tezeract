const employeeRouter = require("express").Router()
import employeeController from "../controllers/Employees"

employeeRouter.post(
  "/create/employees",
  employeeController.createEmployee
)

employeeRouter.get(
  "/get/all",
  employeeController.getAllEmployees
)

employeeRouter.get(
  "/avg-salary",
  employeeController.avgSalary
)

employeeRouter.get(
  "/expereince-level",
  employeeController.experienceLevel
)

employeeRouter.get(
  "/top-earners",
  employeeController.TopEarners
)

employeeRouter.post(
  "/retention-rate",
  employeeController.retentionRate
)

employeeRouter.get(
  "/salary-range",
  employeeController.salaryRange
)


export default employeeRouter
