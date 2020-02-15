const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }
  createEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }
  createRole(role) {
    return this.connection.query("INSERT INTO role SET ?", role);
  }
  createDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department);
  }
  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  findAllRole() {
    return this.connection.query(
      " SELECT role.id, role.title, department.name, role.salary FROM role LEFT JOIN department on role.department_id = department.id"
    );
  }
  findAllDepartment() {
    return this.connection.query(
      " SELECT department.id, department.name, SUM (role.salary) FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name"
    );
  }
  deleteEmployee(employeeId) {
    return this.connection.query(
      "DELETE FORM  employee WHERE id = ?",
      employeeId
    );
  }
  deleteRole(roleId) {
    return this.connection.query("DELETE FORM role WHERE id = ?", roleId);
  }
  deleteDepartment(departmentId) {
    return this.connection.query(
      "DELETE FORM  department WHERE id = ?",
      departmentId
    );
  }
}

module.exports = new DB(connection);
