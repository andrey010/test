/* global module */

'use strict';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var validateIsUnique = function (col, msg) {
    var conditions = {where: {}};
    msg = (!msg) ? col + ' must be unique' : msg;
    return function (value, next) {
        let self = this;
        this.constructor.describe().then(function (schema) {
            conditions.where[col] = value;
            Object.keys(schema).filter(function (field) {
                return schema[field].primaryKey;
            }).forEach(function (pk) {
                conditions.where[pk] = {[Op.ne]: self[pk]};
            });
        }).then(function () {

            return self.constructor.count(conditions).then(function (found) {
                return (found !== 0) ? next(msg) : next();
            });
        }).catch(next);
    };
};

module.exports = function (Sequelize) {
    Sequelize = !Sequelize ? require('sequelize') : Sequelize;
    Sequelize.validateIsUnique = validateIsUnique;
    return Sequelize;
};
