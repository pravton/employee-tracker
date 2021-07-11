const db = require('../db/connection');
const prompts = require('./prompts');
const inquirer = require('inquirer');

class Roles {

  /* =========== function to view all the roles ============ */
  viewAllRoles() {
    db.promise()
    .query(`SELECT r.id, r.title, d.dep_name AS department, r.salary
            FROM roles AS r
            LEFT JOIN department AS d
            ON d.id = r.department_id`)
    .then(([rows, fields]) => {
      console.table('\n', rows);
      // Restart the prompt
      prompts.startPrompt();
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  /* =========== Function to add a new role ============ */
  addRole () {
    return inquirer
    .prompt ([
      // Name of the role
      {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role?',
        validate: nameInput => {
          if(nameInput) {
              return true;
          } else {
              console.log(`   The name cannot be empty, Please enter a valid role!`);
              return false;
          }
        }
      },
      // Salary for this role
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of this role?',
        validate: salaryInput => {
          if(salaryInput) {
              return true;
          } else {
              console.log(`   The name cannot be empty, Please enter a valid salary!`);
              return false;
          }
        },
        filter(val) {
          return parseInt(val);
        }
      },
      // Department for this role
      {
        type: 'list',
        name: 'department',
        message: 'What is the deparment for this role?',
        choices: function() {
          return db.promise()
          .query(`SELECT * FROM department`)
          .then(([rows, fields]) => {
             return rows.map(el => `${el.id} : ${el.dep_name}`);
          })
        },
        filter(val) {
          return parseInt(val.match(/(\d+)/));
        }
      }
    ])
    .then(result => {
      db.promise()
        .query(`INSERT INTO roles (title, salary, department_id)
                VALUES (?, ?, ?)`, [result.roleName, result.salary, result.department])
        .then(([rows, fields]) => {
          // Check if there any affected rows
          if(rows.affectedRows === 0) {
            console.log('\n MESSAGE : Sorry! No changes were made. \n');
          } else {
            console.log(`\n MESSAGE : Success! ${result.roleName} was added to the database \n`);
          }
          // Restart the prompt
          prompts.startPrompt();
        })
    })
    .catch(err => {
      console.log(err);
    })
  }

  /* =========== Function to update a role ============ */
  updateRole() {
    return inquirer
      .prompt([
        // Select a role to update
        {
          type: 'list',
          name: 'role',
          message: 'Please choose a role to update!',
          choices: function() {
            return db.promise()
            .query(`SELECT * FROM roles`)
            .then(([rows, fields]) => {
               return rows.map(el => `${el.id} : ${el.title}`);
            })
          },
          filter(val) {
            return parseInt(val.match(/(\d+)/));
          }
        },
        // Salary for this role
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary of this role?',
          validate: salaryInput => {
            if(salaryInput) {
                return true;
            } else {
                console.log(`   The name cannot be empty, Please enter a valid salary!`);
                return false;
            }
          },
          filter(val) {
            return parseInt(val);
          }
        },
        // Department for this role
        {
          type: 'list',
          name: 'department',
          message: 'What is the deparment for this role?',
          choices: function() {
            return db.promise()
            .query(`SELECT * FROM department`)
            .then(([rows, fields]) => {
               return rows.map(el => `${el.id} : ${el.dep_name}`);
            })
          },
          filter(val) {
            return parseInt(val.match(/(\d+)/));
          }
        }
      ])
      .then(result => {
        db.promise()
          .query(`UPDATE roles
                  SET salary = ${result.salary}, department_id = ${result.department}
                  WHERE id = ${result.role}`)
          .then(([rows, fields]) => {
            // Display the message
            if(rows.affectedRows === 0) {
              console.log('\n MESSAGE : No changes were made. \n');
            } else {
              console.log("\n MESSAGE : Success! The role's details were updated \n");
            }
            // Restart the prompt
            prompts.startPrompt();
          })
          .catch(err => {
            console.log(err);
          })
      });
  }

  /* =========== Function to delete a role ============ */
  deleteRoles() {
    return inquirer
      .prompt([
        // Choosing a role to delete
        {
          type: 'list',
          name: 'role',
          message: 'Please choose a role to delete (Please note that the role value of the employee will be null)',
          choices: function() {
            return db.promise()
            .query(`SELECT * FROM roles`)
            .then(([rows, fields]) => {
               return rows.map(el => `${el.id} : ${el.title}`);
            })
          },
          filter(val) {
            return parseInt(val.match(/(\d+)/));
          }
        }
      ])
      .then(result => {
        db.promise()
          .query(`DELETE FROM roles
                  WHERE id = ${result.role}`)
          .then(([rows, fields]) => {
            if(rows.affectedRows === 0) {
              console.log('\n MESSAGE : No changes were made. Please double check the ID \n');
            } else {
              console.log('\n MESSAGE : Success! The role was deleted \n');
            }
            // Restart the prompt
            prompts.startPrompt();
          })
          .catch(err => {
            console.log(err);
          })
      });
  }
}

module.exports = Roles;