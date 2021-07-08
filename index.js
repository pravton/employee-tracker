const db = require('./db/connection');
const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Roles = require('./lib/Roles');
const cTable = require('console.table');

const viewQuery = new Employee();
const roles = new Roles();

db.connect(err => {
  if(err) throw err;
  console.log('Database Connected');
});

roles.viewAllRoles();