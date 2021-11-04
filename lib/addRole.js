const db = require('./connection');

const addRole = (title, salary, department) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        db.query(`SELECT id FROM department WHERE name = '${department}'`, (err, data) => {
            const deptId = data[0].id;
            const params = [title, salary, deptId];
            db.query(sql, params, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(console.log('New role added.'));
        });
        });
    });
}

module.exports = addRole;