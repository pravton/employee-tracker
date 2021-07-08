const db = require('../db/connection');
const inquirer = require('inquirer');

class Roles {

  // function to view all the roles
  viewAllRoles() {
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

  // Function to add a new role
  addRole (title, salary, departmentID) {
    db.promise()
    .query(`INSERT INTO roles (title, salary, department_id)
            VALUES (?, ?, ?)`, [title, salary, departmentID])
    .then(([rows, fields]) => {
      if(rows.affectedRows === 0) {
        console.log('MESSAGE : Sorry! No changes were made.');
      } else {
        console.log(`MESSAGE : Success! ${title} was added to the database`);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

   // Function to delete roles 
  deleteRoles(id) {
    db.promise()
    .query(`DELETE FROM roles
            WHERE id = ${id}`)
    .then(([rows, fields]) => {
      if(rows.affectedRows === 0) {
        console.log('MESSAGE : No changes were made. Please double check the ID');
      } else {
        console.log('MESSAGE : Success! The role was deleted');
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
}

module.exports = Roles;