import { DataTypes } from "sequelize"
import sequelize from "../config/db.config"

const Employees = sequelize.define(
  "employee",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    departmentId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "department",
        key: "id"
      }
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    position: {
      allowNull: false,
      type: DataTypes.STRING  
    },
    salary: {
      allowNull: false,
      type: DataTypes.INTEGER  
    },
    joiningDate: {
      allowNull: false,
      type: DataTypes.STRING  
    },
    isActive: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN  
    },
    createdAt: {
        field: "created_at",
        allowNull: false,
        defaultValue: new Date(),
        type: DataTypes.DATE
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
  },
  {
    underscored: true,
    createdAt: true,
    updatedAt: true
  }
)

// Employees.sync({alter: true})

export default Employees
