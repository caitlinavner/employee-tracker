// startApp() => {
//    inquirer
//       .prompt({
//          name: “action”,
//          type: “list”,
//          message: “Welcome to our employee database! What would you like to do?“,
//          choices: [
//                “View all employees”,
//                “View all departments”,
//                “View all roles”,
//                “Add an employee”,
//                “Add department”,
//                “Add a role”,
//                “EXIT”
//          ]
//       }).then( (answer)=> {
//          switch (answer.action) {
//             case “View all employees”:
//                viewEmployees();
//                break;
//             case “View all departments”:
//                viewDepartments();
//                break;
//             case “View all roles”:
//                viewRoles();
//                break;
//             case “Add an employee”:
//                addEmployee();
//                break;
//             case “Add department”:
//                addDepartment();
//                break;
//             case “Add a role”:
//                addRole();
//                break;
//             case “EXIT”:
//                endApp();
//                break;
//             default:
//                break;
//          }
//       })
// }
// viewEmployees() =>  {
//    let query = “SELECT * FROM employees”;
//    connection.query(query, (err, res) => {
//       if (err) throw err;
//       console.log(res.length + ” employees found!“);
//       console.table(’All Employees:’, res);
//       startApp();
//    })
// }
// viewDepartments()=>  {
//    let query = “SELECT * FROM department”;
//    connection.query(query, (err, res) => {
//       if(err)throw err;
//       console.table(’All Departments:’, res);
//       startApp();
//    })
// }
//  viewRoles() => {
//    let query = “SELECT * FROM role”;
//    connection.query(query, function(err, res){
//       if (err) throw err;
//       console.table(’All roles:’, res);
//       startApp();
//    })
// }
// addEmployee() => {
//    connection.query(“SELECT * FROM role”, (err, res) => {
//       if (err) throw err;
//       inquirer
//          .prompt([
//             {
//                name: “first_name”,
//                type: “input”,
//                message: “Employee’s fist name: “,
//             },
//             {
//                name: “last_name”,
//                type: “input”,
//                message: “Employee’s last name: ”
//             },
//             {
//                name: “choice”,
//                type: “rawlist”,
//                choices:() => {
//                   let roleArray = [];
//                   for (let i = 0; i < res.length; i++) {
//                      roleArray.push(res[i].title);
//                   }
//                   return roleArray;
//                },
//                message: “What is this employee’s role? ”
//             },
//             ]). then( (answer)=>  {
//             })
//    })
// }
//  addDepartment() => {
// }
// addRole() => {
// }
// endApp()=>  {
// }
const { prompt } = require('inquirer');
const cTable = require('console.table');
const db = require('./db');
async function runSearch() {
	const { choice } = await prompt([
		{
			type: 'list',
			name: 'choice',
			message: 'What would you like to do?',
			choices: [
				{
					name: 'View All Employees',
					value: 'VIEW_EMPLOYEES'
				},
				{
					name: 'View All Employees By Department',
					value: 'VIEW_EMPLOYEES_BY_DEPARTMENT'
				},
				{
					name: 'View All Employees By Manager',
					value: 'VIEW_EMPLOYEES_BY_MANAGER'
				},
				{
					name: 'Add Employee',
					value: 'ADD_EMPLOYEE'
				},
				{
					name: 'Remove Employee',
					value: 'REMOVE_EMPLOYEE'
				},
				{
					name: 'Update Employee Role',
					value: 'UPDATE_EMPLOYEE_ROLE'
				},
				{
					name: 'Update Employee Manager',
					value: 'UPDATE_EMPLOYEE_MANAGER'
				},
				{
					name: 'View All Roles',
					value: 'VIEW_ROLES'
				},
				{
					name: 'Add Role',
					value: 'ADD_ROLE'
				},
				{
					name: 'Remove Role',
					value: 'REMOVE_ROLE'
				},
				{
					name: 'View All Departments',
					value: 'VIEW_DEPARTMENTS'
				},
				{
					name: 'Add Department',
					value: 'ADD_DEPARTMENT'
				},
				{
					name: 'Remove Department',
					value: 'REMOVE_DEPARTMENT'
				},
				{
					name: 'Quit',
					value: 'QUIT'
				}
			]
		}
	]);
	// Call the appropriate function depending on what the user chose
	switch (choice) {
		case "VIEW_EMPLOYEES":
		  return viewEmployees();
		case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
			return viewEmployeesByDepartment();
		case "ADD_EMPLOYEE":
		  return addEmployee();
		case 'REMOVE_EMPLOYEE':
			return removeEmployee();
		case 'UPDATE_EMPLOYEE_ROLE':
			return updateEmployeeRole();
		case "VIEW_DEPARTMENTS":
		  return viewDepartments();
		case "ADD_DEPARTMENT":
		  return addDepartment();
		case 'REMOVE_DEPARTMENT':
			return removeDepartment();
		case "VIEW_ROLES":
		  return viewRoles();
		case "ADD_ROLE":
		  return addRole();
		case 'REMOVE_ROLE':
			return removeRole();
		default:
			return quit();
	}
}
// all add fuctions
async function addRole() {
	const departments = await db.findAllDepartment();
	const departmentChoices = departments.map(({ id, name }) => ({
		name: name,
		value: id
	}));
	const role = await prompt([
		{
			name: 'title',
			message: 'What is the name of the role?'
		},
		{
			name: 'salary',
			message: 'What is the salary of the role?'
		},
		{
			type: 'list',
			name: 'department_id',
			message: 'Which department does the role belong to?',
			choices: departmentChoices
		}
	]);
	await db.createRole(role);
	console.log(`Added ${role.title} to the database`);
}

async function addEmployee() {
	const departments = await db.findAllEmployees();
	const departmentChoices = departments.map(({ id, name }) => ({
		name: name,
		value: id
	}));
	const role = await prompt([
		{
			name: 'title',
			message: 'What is your name?'
		},
		{
			name: 'last name',
			message: 'What is your last name?'
		},
		{
			name: 'role',
			message: 'What is your role?'
		},
		{
			type: 'list',
			name: 'department_id',
			message: 'Which department does the role belong to?',
			choices: departmentChoices
		}
	]);
	await db.createRole(employee);
	console.log(`Added ${employee.title} to the database`);
}

async function addEmployee() {
	const departments = await db.findAllDepartment();
	const departmentChoices = departments.map(({ id, name }) => ({
		name: name,
		value: id
	}));
	const role = await prompt([
		{
			name: 'title',
			message: 'What the department:?'
		}
	]);
	await db.createDepartment(department);
	console.log(`Added ${department.title} to the database`);
}

// all veiw fuctions

async function viewEmployees() {
	const viewEmployeesData = await db.findAllEmployees();

	console.table(viewEmployeesData);
}

async function viewDepatrment() {
	const viewDepartmentData = await db.findAllDepartment();

	console.table(viewDepartmentData);
}

async function viewRole() {
	const viewRoleData = await db.findAllRole();

	console.table(viewRoleData);
}
// all remove fuctions

async function removeRole() {
	const roles = await db.findAllRole();

	const roleChoices = roles.map(({ id, title }) => ({
		name: title,
		value: id
	}));

	const { roleId } = await prompt([
		{
			type: 'list',
			name: 'roleId',
			message: 'Which role do you want to delete?',
			choices: roleChoices
		}
	]);
	await db.deleteRole(roleId);
}


async function removeDepartment() {
	const departments = await db.findAllDepartment();

	const departmentChoices = departments.map(({ id, title }) => ({
		name: title,
		value: id
	}));

	const { departmentId } = await prompt([
		{
			type: 'list',
			name: 'departmentId',
			message: 'Which department do you want to delete?',
			choices: departmentChoices
		}
	]);
	await db.deleteDepartment(departmentId);
}

async function removeEmployee() {
	const employees = await db.findAllEmployee();

	const employeeChoices = employees.map(({ id, title }) => ({
		name: title,
		value: id
	}));

	const { employeeId } = await prompt([
		{
			type: 'list',
			name: 'employeeId',employee
			message: 'Which employee do you want to delete?',
			choices: employeeChoices
		}
	]);
	await db.deleteEmployee(employeeId);
}
runSearch();