require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' :
    (process.env.NODE_ENV === 'development' ? '.env.development' : '.env')
});
const colors = require('colors/safe');

module.exports = {
  "development": {
    "username": process.env.db_username,
    "password": process.env.db_password,
    "database": process.env.db_database,
    "host": process.env.db_host,
    "dialect": process.env.db_dialect,
    "debug": false,
    benchmark: true,
    logging: (logStr, execTime, options) => {
      if (!options) {
        options = execTime;
        execTime = undefined;
      }

      let col = null;
      switch (options.type) {
        case 'SELECT':
          col = colors.blue.bold;
          break;
        case 'UPDATE':
          col = colors.yellow.bold;
          break;
        case 'INSERT':
          col = colors.green.bold;
          break;
        default:
          col = colors.white.bold;
          break;
      }
      if (execTime) {
        if (execTime >= 500) {
          col = colors.red.bold;
          console.log(colors.magenta.bold(`[${execTime} ms]`), col(logStr));
        } else {
          console.log(col(logStr));
        }
      }
    }
  },
  "test": {
    "username": process.env.db_username,
    "password": process.env.db_password,
    "database": process.env.db_database,
    "host": process.env.db_host,
    "dialect": process.env.db_dialect,
    "debug": false,
    "logging": null
  },
  "production": {
    "username": process.env.db_username,
    "password": process.env.db_password,
    "database": process.env.db_database,
    "host": process.env.db_host,
    "dialect": process.env.db_dialect,
    "debug": false,
    "logging": null,
  }
};
