"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "mingukmanse673@gmail.com",
          password: "Manse",
          username: "manse",
          fullname: "Manse",
        },
        {
          email: "hongdiem@gmail.com",
          password: "Roro",
          username: "roro",
          fullname: "Roro",
        },
        {
          email: "tson@gmail.com",
          password: "TSon",
          username: "ts1",
          fullname: "Truong Son",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
