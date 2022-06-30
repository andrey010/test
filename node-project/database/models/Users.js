'use strict';
const {
    Model,
    literal
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    };
    Users.init({
        user_uuid: {
            type: DataTypes.UUID,
            defaultValue: literal('uuid_generate_v4()'),
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
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Users',
        tableName: 'users',
        timestamps: true,
        underscored: false
    });
    return Users;
};