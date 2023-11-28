import Employee from "./Employees";
import Department from "./Department";

Employee.belongsTo(Department, {foreignKey: "department_id", as: "department"})

Department.hasMany(Employee, { foreignKey: 'department_id' }); 






