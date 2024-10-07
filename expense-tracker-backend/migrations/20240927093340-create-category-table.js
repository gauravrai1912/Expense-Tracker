'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Categories table
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,  // Ensure default timestamp
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,  // Ensure default timestamp
      },
    });

    // Add foreign key category_id to expenses table
    await queryInterface.addColumn('expenses', 'category_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE',  // Optional: Set cascade delete if needed
    });

    // Remove the old 'category' column from expenses table
    await queryInterface.removeColumn('expenses', 'category');
  },

  down: async (queryInterface, Sequelize) => {
    // Add back the 'category' column to expenses table
    await queryInterface.addColumn('expenses', 'category', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Remove the 'category_id' foreign key column
    await queryInterface.removeColumn('expenses', 'category_id');

    // Drop Categories table
    await queryInterface.dropTable('Categories');
  }
};
