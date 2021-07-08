const db = require('../db/connection');

class Employee {
  // function to view all the employees
  viewAllEmployees() {
    db.promise()
    .query(`SELECT e.id, e.first_name, e.last_name, r.title, d.dep_name , r.salary,  CONCAT(e2.first_name, ' ', e2.last_name ) AS Manager
            FROM employee AS e
            LEFT JOIN employee AS e2 ON e2.id = e.manager_id
            LEFT JOIN roles AS r ON e.role_id = r.id 
            LEFT JOIN department AS d ON d.id = r.department_id`)
    .then(([rows, fields]) => {
      console.table(rows);
    })
    .catch(err => {
      console.log(err);
    })
  }

  // function to view all the employees by Manager
  viewEmployeesByManager(id) {
    db.promise()
    .query(`SELECT e.id, e.first_name, e.last_name, r.title, d.dep_name , r.salary, CONCAT(e2.first_name, ' ', e2.last_name ) AS Manager
            FROM employee AS e
            INNER JOIN employee AS e2 ON e2.id = e.manager_id AND e.manager_id = ${id}
            INNER JOIN roles AS r ON e.role_id = r.id 
            INNER JOIN department AS d ON d.id = r.department_id`)
    .then(([rows, fields]) => {
      console.table(rows);
    })
    .catch(err => {
      console.log(err);
    })
  }

  // function to view all the employees by department
  viewEmployeesByDepartment(id) {
    db.promise()
    .query(`SELECT e.id, e.first_name, e.last_name, r.title, d.dep_name , r.salary, CONCAT(e2.first_name, ' ', e2.last_name ) AS Manager
            FROM employee AS e
            INNER JOIN employee AS e2 ON e2.id = e.manager_id 
            INNER JOIN roles AS r ON e.role_id = r.id 
            INNER JOIN department AS d ON d.id = r.department_id AND r.department_id = ${id}`)
    .then(([rows, fields]) => {
      console.table(rows);
    })
    .catch(err => {
      console.log(err);
    })
  }

  // Funtion to add an employee
  addEmployee(firstName, lastName, roleId, managerId) {
    db.promise()
    .query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?)`, [firstName, lastName, roleId, managerId])
    .then(([rows, fields]) => {
      if(rows.affectedRows === 0) {
        console.log('MESSAGE : Sorry! No changes were made.');
      } else {
        console.log(`MESSAGE : Success! ${firstName} ${lastName} was added to the database`);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  // Function to delete employee
  deleteEmployee(id) {
    db.promise()
    .query(`DELETE FROM employee
            WHERE id = ${id}`)
    .then(([rows, fields]) => {
      if(rows.affectedRows === 0) {
        console.log('MESSAGE : No changes were made. Please double check the ID');
      } else {
        console.log('MESSAGE : Success! The employee was deleted');
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

   // function to update employee's manager
   updateEmployeeManager(emp_Id, manager_id) {
    db.promise()
    .query(`UPDATE employee
            SET manager_id = ${manager_id}
            WHERE id = ${emp_Id}`)
    .then(([rows, fields]) => {
      if(rows.affectedRows === 0) {
        console.log('MESSAGE : No changes were made. Please double check the ID');
      } else {
        console.log("MESSAGE : Success! The employee's manager was updated");
      }
    })
    .catch(err => {
      console.log(err);
    })
    .then(this.viewEmployeesByManager(manager_id));
  }
}

module.exports = Employee;