const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": "root",                   // mysql 계정이름
    "password": process.env.DB_PASSWORD,  // mysql 비밀번호
    "database": "react-project",
    "host": "127.0.0.1",
    "port": "3306",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "react-project",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "react-project",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}