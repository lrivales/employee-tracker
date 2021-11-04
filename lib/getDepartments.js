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

module.exports = getDepartments;