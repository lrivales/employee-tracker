// const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./lib/connection');
const getDepartments = require('./lib/getDepartments');
const getRoles = require('./lib/getRoles');
const getEmployees = require('./lib/getEmployees');
const addDepartment = require('./lib/addDepartment');
const addRole = require('./lib/addRole');
const addEmployee = require('./lib/addEmployee');

let departments = [];
let employees = [];
let roles = [];

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
                    'Add an Employee'
                ]
            }
        ]).then(answer => {
            switch (answer.action) {
                case 'View All Departments':
                    getDepartments()
                        .then(departments => console.table(departments))
                        .then(() => askAgain())
                        .catch((err) => console.log(err));
                    break;

                case 'View All Roles':
                    getRoles()
                        .then(roles => console.table(roles))
                        .then(() => askAgain())
                        .catch((err) => console.log(err));
                    break;

                case 'View All Employees':
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
                        ]).then(answer => addDepartment(answer.department))
                        .then(() => askAgain())
                        .catch((err) => console.log(err));
                    break;

                case 'Add a Role':
                    getDepartments()
                        .then(results => {
                            for (i = 0; i < results.length; i++) {
                                departments.push(results[i].name);
                            }
                        })
                        .then(() => {
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
                                        type: 'list',
                                        name: 'department',
                                        message: 'Please select a department for this new role.',
                                        choices: departments
                                    }
                                ])
                                .then(answers => {
                                    addRole(answers.role, answers.salary, answers.department)
                                        .then(() => askAgain());
                                })
                                .catch((err) => console.log(err));
                        });
                    break;
                
                case 'Add an Employee':
                    getEmployees()
                        .then(results => {
                            for (i = 0; i < results.length; i++) {
                            employees.push(results[i].first_name + ' ' + results[i].last_name);
                            }
                        })
                        .then(() => {
                            getRoles()
                                .then(results => {
                                    for (i = 0; i < results.length; i++) {
                                        roles.push(results[i].title);
                                    }
                                });
                        })
                        .then(() => {
                            inquirer
                                .prompt([
                                    {
                                        type: 'input',
                                        name: 'first_name',
                                        message: "What is the new employee's first name?"
                                    },
                                    {
                                        type: 'input',
                                        name: 'last_name',
                                        message: "What is the new employee's last name?"
                                    },
                                    {
                                        type: 'list',
                                        name: 'title',
                                        message: "What is the new employee's title?",
                                        choices: roles
                                    },
                                    {
                                        type: 'list',
                                        name: 'manager',
                                        message: "Who is the new employee's manager?",
                                        choices: employees
                                    }
                                ])
                                .then(answers => {
                                    addEmployee(answers.first_name, answers.last_name, answers.title, answers.manager)
                                        .then(() => {
                                            askAgain()
                                        })
                                        .catch((err) => console.log(err));
                                })
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