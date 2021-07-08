const db = require('../db/connection');

class Select {
  constructor () {
    this.result = [];
  }

  selectDepartments() {
    db.query(`SELECT * FROM department`, (err, results) => {
      // console.log(results);
      return results;
    });
  }

  async selectRoles() {
    let result;
    db.promise()
    .query(`SELECT r.id, r.title, d.dep_name AS department, r.salary
            FROM roles AS r
            LEFT JOIN department AS d
            ON d.id = r.department_id`)
    .then(([rows, fields]) => {
      // console.table(rows);
      result = rows.map(el => el.title);
    })
    .catch(err => {
      console.log(err);
    })

    return await result;
  }
}

module.exports = Select;