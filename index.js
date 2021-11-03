const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'l@wr3nc30871',
    database: 'employee'
});

runQuery = (sql) => {
    db.query(`${sql}`, (err, results) => {
        console.table(results);
    });
}

init = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['View All Departments', 'View All Roles']
            }
        ]).then(answer => {
            switch (answer.action) {
                case 'View All Departments':
                    runQuery('SELECT * FROM department');
                case 'View All Roles':
                    runQuery('SELECT role.title, role.id, department.name, role.salary FROM role INNER JOIN department ON role.department_id=department.id;')
                default:
                    break;
            }
    });
}  

init();