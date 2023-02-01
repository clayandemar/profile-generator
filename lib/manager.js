const Employee = require("./Employee");

module.exports = class Manager extends Employee {

  office = "";
  engineers = [];
  interns = [];
  role = "Manager";
}

