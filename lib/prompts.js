const inquirer = require('inquirer');
const Employee = require('./Employee');
const Roles = require('./Roles');
const Department = require('./Department');
const cTable = require('console.table');

const employee = new Employee;
const department = new Department;
const roles = new Roles;

function startPrompt() {
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'task',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Update employee managers',
          'View employees by manager',
          'View employees by department',
          'Delete a departement',
          'Delete a role',
          'Delete an employee',
          'Combined employee salaries by department'
        ]
      }
    ])
    .then(choice => {
      switch (choice.task) {
        case 'View all employees' : 
          employee.viewAllEmployees();
          break;

        case 'View all departments' : 
          department.viewAllDepartments();
          break;

        case 'View all roles' : 
          roles.viewAllRoles();
          break;

        case 'Add a department' : 
          department.addDepartment();
          break;

        case 'Add a role' : 
          roles.addRole();
          break;

        case 'Add an employee' : 
          employee.addEmployee();
          break;

        case 'Update an employee role': 
          employee.updateEmployeeRole();
          break;

        case 'Update employee managers': 
          employee.updateEmployeeManager();
          break;

        case 'View employees by manager': 
          employee.viewEmployeesByManager();
          break;

        case 'View employees by department': 
          employee.viewEmployeesByDepartment();
          break;

        case 'Delete a departement': 
          department.deleteDepartment();
          break;

        case 'Delete a role': 
          roles.deleteRoles();
          break;

        case 'Delete an employee': 
          employee.deleteEmployee();
          break;

        case 'Combined employee salaries by department': 
          department.combinedSalaries();
          break;
      }
    })
}

exports.startPrompt = startPrompt;