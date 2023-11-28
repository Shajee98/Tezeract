import employeesService from "../../../../../../services/employees/Employees"
import responses from "../../../../../../constants/Responses"
import { RequestHandler } from "express";
import { genericResponseByData, serverErrorResponse, successResponse } from "../../../../../../utils/Response";

const createEmployee: RequestHandler = async (req, res, next) => {
  try {
    const { name, position, department_id } = req.body
    const expereince_level = await employeesService.createEmployee({name, position, department_id})
    if (!expereince_level) {
      return serverErrorResponse(res, responses.FAILURE);
    }

    return successResponse(res, {expereince_level});
  } catch (error) {
    next(error)
  }
}

const getAllEmployees: RequestHandler = async (req, res, next) => {
    try {
            const employees = await employeesService.getAllEmployees()
  
            if (!employees)
            {
              return serverErrorResponse(res, responses.SUCCESS)
            }
        
            return res.send(genericResponseByData(employees, { success: responses.SUCCESS }));
      } catch (error) {
        next(error)
      }
}

const avgSalary: RequestHandler = async (req, res, next) => {
    try {
            const avgSalaryByDept = await employeesService.avgSalary()
  
            if (!avgSalaryByDept)
            {
              return serverErrorResponse(res, responses.FAILURE)
            }
        
            return res.send(genericResponseByData(avgSalaryByDept, { success: responses.SUCCESS }));
      } catch (error) {
        next(error)
      }
}

const experienceLevel: RequestHandler = async (req, res, next) => {
  try {
    const { min, max } = req.query
    const expereince_level = await employeesService.experienceLevel(Number(min), Number(max))
    if (!expereince_level) {
      return serverErrorResponse(res, responses.FAILURE);
    }

    return successResponse(res, {expereince_level});
  } catch (error) {
    next(error)
  }
}

const TopEarners: RequestHandler = async (req, res, next) => {
    try {
        const { n } = req.query
            const response_saved = await employeesService.TopEarners(Number(n))
  
            if (!response_saved)
            {
              return serverErrorResponse(res, responses.USER_REGISTRATION_FAILURE)
            }
        
            return res.send(genericResponseByData(response_saved, { success: responses.ADMIN_REGISTRATION_SUCCESS }));
      } catch (error) {
        next(error)
      }
}

const retentionRate: RequestHandler = async (req, res, next) => {
    try {
            const { noOfEmpAtEnd, LeftEmp, EmpAtStart } = req.body
            const format = await employeesService.retentionRate(noOfEmpAtEnd, LeftEmp, EmpAtStart)
  
            if (!format)
            {
              return serverErrorResponse(res, responses.FAILURE)
            }
        
            return res.send(genericResponseByData(format, { success: responses.SUCCESS }));
      } catch (error) {
        next(error)
      }
}

const salaryRange: RequestHandler = async (req, res, next) => {
  try {
    const { min, max } = req.query
    const statuses = await employeesService.salaryRange(Number(min), Number(max))

    if (!statuses)
    {
      return serverErrorResponse(res, responses.USER_REGISTRATION_FAILURE)
    }

    return res.send(genericResponseByData(statuses, { success: responses.ADMIN_REGISTRATION_SUCCESS }));
} catch (error) {
next(error)
}
}

const whatsappController = {
    createEmployee,
    getAllEmployees,
    experienceLevel,
    avgSalary,
    retentionRate,
    TopEarners,
    salaryRange,
} 

export default whatsappController
