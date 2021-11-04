// const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const getDepartments = require('./db/queries');
const getRoles = require('./db/queries');
const getEmployees = require('./db/queries')

// async function runQuery(sql) {
//     const connection = await mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'l@wr3nc30871',
//         database: 'employee'
//     });

//     const results = await connection.execute(`${sql}`);
//     console.table(results[0]);
//     connection.end();

//     inquirer
//         .prompt([
//             {
//                 type: 'list',
//                 name: 'askAgain',
//                 message: 'Would you like to perform another task?',
//                 choices: ['Yes', 'No']
//             }
//         ]).then(answer => {
//             if (answer.askAgain === 'Yes') {
//                 init();
//             } else {
//                 console.log("Thank you for using the Employee DB Manager.");
//             }
//     });
// }

init = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View All Departments', 
                    'View All Roles',
                    'View All Employees',
                    'Add a Department',
                    'Add a Role',
                ]
            }
        ]).then(answer => {
            switch (answer.action) {
                case 'View All Departments':
                    console.log(answer.action)
                    // runQuery(`SELECT * FROM department;`)
                    getDepartments()
                        .then(departments => console.table(departments))
                        .then(() => askAgain())
                        .catch((err) => console.log(err));
                    break;
                case 'View All Roles':
                    console.log(answer.action)
                    // runQuery(`SELECT role.title, role.id, department.name, role.salary FROM role
                    //     INNER JOIN department ON role.department_id=department.id;`)
                    getRoles()
                        .then(roles => console.table(roles))
                        .then(() => askAgain())
                        .catch((err) => console.log(err));
                    break;
                case 'View All Employees':
                    console.log(answer.action)
                    // runQuery(`
                    //     SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                    //     FROM employee
                    //     LEFT JOIN employee AS manager ON employee.manager_id = manager.id
                    //     INNER JOIN role ON employee.role_id=role.id
                    //     INNER JOIN department ON role.department_id=department.id;
                    // `)
                    getEmployees()
                        .then(employees => console.table(employees))
                        .then(() => askAgain())
                        .catch((err) => console.log(err));
                    break;
                case 'Add a Department':
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'department',
                                message: 'What department would you like to add?'
                            }
                        ]).then(answer => {
                            runQuery(`INSERT INTO department (name) VALUES ('${answer.department}');`);
                        });
                    break;
                case 'Add a Role':
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'role',
                                message: 'What title do you want to add?'
                            },
                            {
                                type: 'number',
                                name: 'salary',
                                message: 'What is the salary?'
                            },
                            {
                                type: 'number',
                                name: 'departmentId',
                                message: 'What is the department ID?'
                            }
                        ]).then(answers => {
                            runQuery(`
                                INSERT INTO role (title, salary, department_id)
                                    VALUES
                                        ('${answers.role}', ${answers.salary}, ${answers.departmentId});
                            `)
                        });
                default:
                    break;
            }
    });
}

function askAgain() {
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
                console.log("Thank you for using the Employee DB Manager.");
                db.end()
            }
    });
}

init();