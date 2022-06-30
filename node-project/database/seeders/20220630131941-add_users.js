'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        first_name: "Fulano",
        last_name: "Admin",
        user_name: "admin",
        user_group: "one.admin.two.three",
        password: "admin",
      },
      {
        first_name: "Mengano",
        last_name: "Admin",
        user_name: "user",
        user_group: "one.user.two.three",
        password: "user",
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users',{})

  }
};
