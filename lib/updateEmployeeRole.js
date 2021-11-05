const db = require('./connection');

const updateEmployeeRole = (employee, title) => {
    return new Promise ((resolve, reject) => {
        const sql = `UPDATE employee SET role_id = ? WHERE CONCAT(first_name, ' ',last_name)='${employee}'`;
        db.query(`SELECT id FROM role WHERE title='${title}'`, (err, data) => {
            const role_id = data[0].id;
            console.log(role_id);
            const params = role_id
            db.query(sql, params, (err, rows) => {
                if (err) {
                    return reject(err)
                }
                resolve(console.log('Employee role was successfully updated.'))
            });
        });
    });
};

module.exports = updateEmployeeRole;