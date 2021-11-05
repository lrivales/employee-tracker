const db = require('./connection');

const addEmployee = (first_name, last_name, title, manager) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
        db.query(`SELECT id from role WHERE title='${title}'`, (err, data) => {
            const role_id = data[0].id;
            db.query(`SELECT id FROM employee WHERE CONCAT(first_name, ' ',last_name)='${manager}' `, (err, data) => {
                const mgr_id = data[0].id;
                const params = [first_name, last_name, role_id, mgr_id]
                db.query(sql, params, (err, rows) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(console.log('New employee added.'));
                });
            });
        });
    });
}

module.exports = addEmployee;