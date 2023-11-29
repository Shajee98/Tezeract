import { Op } from "sequelize";
import sequelize from "../../config/db.config"
import Employees from "../../models/Employees";
import Department from "../../models/Department";


export const createEmployee = async (employeeDetails: any) => {
  try {
    const { name, position, salary, joining_date, department_id } = employeeDetails
    const employee = await Employees.create({
          name,
          position,
          salary,
          joiningDate: joining_date,
          departmentId: department_id
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
      attributes: ['id', [sequelize.fn('AVG', sequelize.col('employees.salary')), 'average_salary']],
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

const retentionRate = async (startDate: any, endDate: any) => {
  try {
    const departments = await Department.findAll({
      attributes: ['id', 'name'],
      include: [{
        model: Employees,
        // attributes: [],
        where: {
          [Op.and]: [
            sequelize.literal(`DATEDIFF(joining_date, ${endDate})`),
            // is_active: true,
          ],
            }
      }],
    });

    // const retentionRates = departments.map(department => {
    //   const totalEmployees = department.Employees.length;
    //   const retainedEmployees = department.Employees.filter(employee => employee.is_active).length;

    //   const retentionRate = totalEmployees === 0 ? 100 : (retainedEmployees / totalEmployees) * 100;

    //   return {
    //     departmentId: department.id,
    //     departmentName: department.name,
    //     retentionRate: retentionRate.toFixed(2),
    //   };
    // });
    
    return {
      departments
    }
  } catch (error) {
    console.error(error);
  }
}

const experienceLevel = async (minExp: number, maxExp: number) => {
  try {
    const date = new Date();
    const currentDate = date.getFullYear().toString() + '-' + date.getMonth().toString() + '-' + date.getDate().toString()

    console.log("currentDate ===> ", currentDate)
    const employees = await Employees.findAll({
      attributes: [
        'id',
        [sequelize.fn('TIMESTAMPDIFF', 
        sequelize.literal('YEAR'), 
        sequelize.col('joining_date'), 
        sequelize.fn('CURDATE')
      ), 'experience'],
      ],
      where: {
        [Op.and]: [
          sequelize.literal(`TIMESTAMPDIFF(YEAR, joining_date, CURDATE()) >= ${minExp}`),
          sequelize.literal(`TIMESTAMPDIFF(YEAR, joining_date, CURDATE()) <= ${maxExp}`),
        ],
      },
    });
    
    return employees
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