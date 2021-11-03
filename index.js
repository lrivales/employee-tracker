const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const cTable = require('console.table');

async function runQuery(sql) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'l@wr3nc30871',
        database: 'employee'
    });

    const results = await connection.execute(`${sql}`);
    console.table(results[0]);

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'askAgain',
                message: 'Would you like to perform another task?',
                choices: ['Yes', 'No']
            }
        ]).then(answer => {
            if (answer.askAgain === 'Yes') {
                init();
            } else {
                connection.end();
                console.log("Thank you for using the Employee DB Manager.");
            }
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
                    console.log(answer.action);
                    runQuery('SELECT * FROM department')
                    break;
                case 'View All Roles':
                    console.log(answer.action);
                    runQuery('SELECT role.title, role.id, department.name, role.salary FROM role INNER JOIN department ON role.department_id=department.id;')
                    break;
                default:
                    break;
            }
    });
}

init();