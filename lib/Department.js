const db = require('../db/connection');

class Department {

  // function to view all the departments
  viewAllDepartments() {
    db.promise()
    .query(`SELECT * FROM department`)
    .then(([rows, fields]) => {
      console.table(rows);
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  // Function to add a new department
  addDepartment (department) {
    db.promise()
    .query(`INSERT INTO department (dep_name)
            VALUES (?)`, [department])
    .then(([rows, fields]) => {
      if(rows.affectedRows === 0) {
        console.log('MESSAGE : Sorry! No changes were made.');
      } else {
        console.log(`MESSAGE : Success! ${department} was added to the database`);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  //function to delete department 
  deleteDepartment(id) {
    db.promise()
    .query(`DELETE FROM department
            WHERE id = ${id}`)
    .then(([rows, fields]) => {
      if(rows.affectedRows === 0) {
        console.log('MESSAGE : No changes were made. Please double check the ID');
      } else {
        console.log('MESSAGE : Success! The department was deleted.');
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
}

module.exports = Department;