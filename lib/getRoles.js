const db = require('./connection');

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

module.exports = getRoles;