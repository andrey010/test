'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    //await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    return queryInterface.sequelize.transaction(t => {

      return Promise.all([

        queryInterface.createTable('users', {
          user_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.literal('uuid_generate_v4()'),
            primaryKey: true
          },
          first_name: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          last_name: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          user_name: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          user_group: {
            type: DataTypes.STRING(155),
            allowNull: true,
          },
          password: {
            type: DataTypes.STRING(255),
            allowNull: true
          },
          createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.literal('now()'),
            allowNull: true
          },
          updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.literal('now()'),
            allowNull: true
          }
        }, { transaction: t })

      ]).catch(err => {
        t.rollback();
      })
    });


  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable('users', { transaction: t }),
      ]);
    });


  }
};

