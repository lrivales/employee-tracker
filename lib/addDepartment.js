const db = require('./connection');

const addDepartment = (name) => {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const params = name;
        db.query(sql, params, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(console.log('New department added.'));
        });
    });
}

module.exports = addDepartment;