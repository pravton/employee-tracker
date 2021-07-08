const db = require('../db/connection');

class Select {

  selectDepartments() {
    db.promise()
    .query(`SELECT * FROM department`)
    .then(([rows, fields]) => {
      return rows.map(el => el.dep_name);
    })
    .then(results => {
      return inquirer
      .prompt([
          {
              type: "list",
              message: "Choose a department?",
              name: "department",
              choices: [
                  // populate from db
                  ...results
              ]
          }
      ])
    })
    .catch(err => {
      console.log(err);
    })
  }

  selectRoles() {
    db.promise()
    .query(`SELECT r.id, r.title, d.dep_name AS department, r.salary
            FROM roles AS r
            LEFT JOIN department AS d
            ON d.id = r.department_id`)
    .then(([rows, fields]) => {
      // console.table(rows);
      return rows.map(el => el.title);
    })
    .catch(err => {
      console.log(err);
    })
  }
}

module.exports = Select;