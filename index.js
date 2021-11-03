const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'l@wr3nc30871',
    database: 'employee'
  });

db.query(`SELECT * FROM department`, (err, results, fields) => {
    console.table(results);
});