"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Task", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },

      duedate: {
        type: Sequelize.STRING,
      },

      idUser: {
        type: Sequelize.INTEGER,
      },

      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Task");
  },
};
