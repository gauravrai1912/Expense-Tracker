'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    static associate(models) {
      // Reference to Category model
      Expense.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
      });
    }
  }
  Expense.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',   // Refer to Users table
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      },
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    description: {
      type: DataTypes.TEXT
    },
    receipt_url: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Expense',
    tableName: 'expenses',   // Table name is lowercase
    underscored: true        // Use snake_case for columns
  });

  return Expense;
};
