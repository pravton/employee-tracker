const db = require('../db/connection');
const inquirer = require('inquirer');
const prompts = require('./prompts');

class Department {

  // function to view all the departments
  viewAllDepartments() {
    db.promise()
    .query(`SELECT * FROM department`)
    .then(([rows, fields]) => {
      console.table(`\n`, rows);
      prompts.startPrompt();
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  // Function to add a new department
  addDepartment () {
    return inquirer
      .prompt ([
        {
          type: 'input',
          name: 'departmentName',
          message: 'What is the name of the department?',
          validate: nameInput => {
            if(nameInput) {
                return true;
            } else {
                console.log(`   The name cannot be empty, Please enter a valid name!`);
                return false;
            }
          }
        }
      ]).then(result => {
          db.promise()
          .query(`INSERT INTO department (dep_name)
                  VALUES (?)`, [result.departmentName])
          .then(([rows, fields]) => {
            if(rows.affectedRows === 0) {
              console.log('\n MESSAGE : Sorry! No changes were made. \n');
            } else {
              console.log(`\n MESSAGE : Success! ${result.departmentName} was added to the database \n`);
            }
            prompts.startPrompt();
          })
        })
        .catch(err => {
          console.log(err);
        })
  }


  //function to delete department 
  deleteDepartment() {
    return inquirer
      .prompt([
        {
          type: 'list',
          name: 'department',
          message: 'Please choose a department to delete (Please note that the values of the roles will be null)',
          choices: function() {
            return db.promise()
            .query(`SELECT * FROM department`)
            .then(([rows, fields]) => {
               return rows.map(el => `${el.id} ${el.dep_name}`);
            })
          },
          filter(val) {
            return parseInt(val.match(/(\d+)/));
          }
        }
      ])
      .then(result => {
        db.promise()
          .query(`DELETE FROM department
                  WHERE id = ${result.department}`)
          .then(([rows, fields]) => {
            if(rows.affectedRows === 0) {
              console.log('\n MESSAGE : No changes were made. Please double check the ID \n');
            } else {
              console.log('\n MESSAGE : Success! The department was deleted. \n');
            }

            prompts.startPrompt();
          })
          .catch(err => {
            console.log(err);
          })
      })
  }

  // Combined Salaries By Department
  combinedSalaries () {
    db.promise()
          .query(`SELECT d.dep_name AS Department, COUNT(d.dep_name) AS EmployeeCount, SUM(r.salary) AS TotalSalary 
                  FROM employee AS e
                  LEFT JOIN roles AS r ON e.role_id = r.id 
                  LEFT JOIN department AS d ON d.id = r.department_id
                  GROUP BY d.dep_name`)
          .then(([rows, fields]) => {
            console.table(`\n`, rows);
            prompts.startPrompt();
          })
          .catch(err => {
            console.log(err);
          })
  }
}

module.exports = Department;