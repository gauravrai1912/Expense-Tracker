'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Budgets', 'budget_period', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: /^\d{4}-(0[1-9]|1[0-2])$/ // Validate that it's in 'YYYY-MM' format
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Budgets', 'budget_period');
  }
};
