// const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./lib/connection');
const getDepartments = require('./lib/getDepartments');
const getRoles = require('./lib/getRoles');
const getEmployees = require('./lib/getEmployees');
const addDepartment = require('./lib/addDepartment');
const addRole = require('./lib/addRole');

let departments = [];

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
                    // add function here
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