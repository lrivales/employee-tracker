const db = require('./connection');

const getDepartments = () => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT * FROM department`;
        db.query(sql, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

const getRoles = () => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT role.title, role.id, department.name, role.salary FROM role INNER JOIN department ON role.department_id=department.id`;
        db.query(sql, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

const getEmployees = () => {
    return new Promise ((resolve, reject) => {
        const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee
                    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
                    INNER JOIN role ON employee.role_id=role.id
                    INNER JOIN department ON role.department_id=department.id`;
        db.query(sql, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports = getDepartments, getRoles, getEmployees;