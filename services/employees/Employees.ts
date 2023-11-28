import { Op } from "sequelize";
import sequelize from "../../config/db.config"
import Employees from "../../models/Employees";
import Department from "../../models/Department";


export const createEmployee = async (employeeDetails: any) => {
  try {
    const { name, position, salary, joining_date } = employeeDetails
    const employee = await Employees.create({
          name,
          position,
          salary,
          joiningDate: joining_date,
        })

    return employee
  } catch (error) {
    throw error
  }
};

export const getAllEmployees = async () => {
  try {
      const employees = await Employees.findAll()

      return employees
  } catch (error) {
    throw error
  }
};

export const avgSalary = async () => {
  try {
    const avgSalaries = await Department.findAll({
      attributes: ['id', [sequelize.fn('AVG', sequelize.col('employee.salary')), 'average_salary']],
      include: [{
        model: Employees,
        attributes: [],
      }],
      group: ['department.id'],
    })

    return avgSalaries;
  } catch (error) {
    throw error;
  }
};

export const salaryRange = async (minSalary: number, maxSalary: number) => {
  try {
    const employees = await Employees.findAll({
      where: {
        salary: {
          [Op.between]: [minSalary, maxSalary],
        },
      },
    });
    
    return employees;
  } catch (error) {
    console.error(error);
  }
};


export const TopEarners = async (n: number) => {
  try {
    const topEmployees = await Employees.findAll({
      order: [['salary', 'DESC']], // Order by salary in descending order
      limit: n, // Limit the result to the top N salaries
    });
    return topEmployees;
  } catch (error) {
    throw error;
  }
};

const retentionRate = async (noOfEmpAtEnd: number, LeftEmp: number, EmpAtStart: number) => {
  try {
    
    
    return {
      
    }
  } catch (error) {
    console.error(error);
  }
}

const experienceLevel = async (minExp: number, maxExp: number) => {
  try {
    const currentDate = new Date();

    const employees = await Employees.findAll({
      attributes: [
        [sequelize.fn('DATEDIFF', currentDate, sequelize.col('joining_date')), 'experience'],
      ],
      where: {
        [Op.and]: [
          sequelize.literal(`DATEDIFF('${currentDate}', 'joining_date') >= ${minExp}`),
          sequelize.literal(`DATEDIFF('${currentDate}', 'joining_date') <= ${maxExp}`),
        ],
      },
    });
    
    return {
      employees: employees,
    }
  } catch (error) {
    console.error(error);
  }
}

const employeesService = {
    createEmployee,
    avgSalary,
    getAllEmployees,
    TopEarners,
    salaryRange,
    retentionRate,
    experienceLevel
}

export default employeesService