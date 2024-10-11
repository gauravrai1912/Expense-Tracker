'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    static associate(models) {
      
      Budget.belongsTo(models.User, { foreignKey: 'user_id' });
      Budget.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category', 
      });
    }
  }
  
  Budget.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id',
      },
    },
    monthly_budget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    budget_period: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        is: /^\d{4}-(0[1-9]|1[0-2])$/ 
      }
    }
  }, {
    sequelize,
    modelName: 'Budget',
  });

  return Budget;
};
