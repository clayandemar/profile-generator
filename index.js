
const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
const Employee = require('./lib/Employee.js'); 
var manager = new Manager();


function generateNewMembers() {
  console.log(manager);
  var allHtml = ""
  for (var i = 0; i < manager.engineers.length; i++) {
    allHtml += engineerTemplate(manager.engineers[i]);
  }   for (var i = 0; i < manager.interns.length; i++) {
    allHtml += internTemplate(manager.interns[i]);
  }
  return allHtml;
}

//HTML template for profile manager
const htmlTemplate = ({ name, id, email, role, office }) =>
  `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css">
    <title>Team Profile</title>
  </head>
  <body>
    <header class="p-5 mb-4 header bg-light">
      <div class="container">
        <h1 class="display-4">${name}</h1>
        <h2 class="lead">Positon: ${role}</h2>
        <ul class="list-group">
          <li class="list-group-item">ID: ${id}</li>
          <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
          <li class="list-group-item">Office Number: ${office}</li>
        </ul>
      </div> 
      ${generateNewMembers()}
    </header>
  </body>
  </html>
`;

//HTML template for profile engineer
const engineerTemplate = ({ name, role, id, email, github }) =>
  `<div class="container">
<h1 class="display-4">${name}</h1>
<h2 class="lead">Positon: ${role}</h2>
<ul class="list-group">
  <li class="list-group-item">ID: ${id}</li>
  <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
  <li class="list-group-item">Github: <a href="https://github.com/${github}" target="_blank">${github}</a></li>
</ul>
</div>
`;

//HTML template for profile engineer
const internTemplate = ({ name, role, id, email, school }) =>
  `<div class="container">
<h1 class="display-4">${name}</h1>
<h2 class="lead">Positon: ${role}</h2>
<ul class="list-group">
  <li class="list-group-item">ID: ${id}</li>
  <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
  <li class="list-group-item">School: ${school}</li>
</ul>
</div> 
`;


//Questions for manager
inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is your name?',
      name: 'name'
    },
    {
      type: 'input',
      message: 'Type in your id number:',
      name: 'id'
    },
    {
      type: 'input',
      message: 'Type in your email address',
      name: 'email'
    },
    {
      type: 'input',
      message: 'Type in your office number',
      name: 'office'
    },
    {
      type: 'list',
      message: 'Would you like to add another team member?',
      choices: ['Engineer', 'Intern', 'No'],
      name: 'newMember'
    },
  ])

  // Taking manager data and asking if you will be adding an engineer or intern or if you're all done
  .then(function (answers) {
    manager.name = answers.name;
    manager.id = answers.id;
    manager.email = answers.email;
    manager.github = answers.github;
    manager.office = answers.office;
    console.log(manager);
    if (answers.newMember === 'Engineer') {
      getEngineer()
    } else if (answers.newMember === 'Intern') {
      getIntern()
    } else if (answers.newMember === 'No') {
      writeToFile("./dist/index.html", htmlTemplate(manager))
    }
  })

// Writing data into an HTML file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, err => {
    if (err) {
      return console.log(err);
    }
    console.log("Your Team Profile page has been generated")
  });
}


// Function to get the next engineer and ask the following prompt
function getEngineer() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is your name?',
      name: 'name'
    },
    {
      type: 'input',
      message: 'Type in your id number:',
      name: 'id'
    },
    {
      type: 'input',
      message: 'Type in your email address',
      name: 'email'
    },
    {
      type: 'input',
      message: 'Type in your GitHub username',
      name: 'github'
    },
    {
      type: 'list',
      message: 'Would you like to add another team member?',
      choices: ['Engineer', 'Intern', 'No'],
      name: 'newMember'
    },
  ])

    .then(function (engineer) {
      console.log(engineer)
      manager.engineers.push(engineer)
      if (engineer.newMember === 'Engineer') {
        getEngineer()
      } else if (engineer.newMember === 'Intern') {
        getIntern()
      } else if (engineer.newMember === 'No') {
        console.log(manager)
        writeToFile("./dist/index.html", htmlTemplate(manager))
      }
    })
};

// Function to get the next Intern and ask the following prompt
function getIntern() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is your name?',
      name: 'name'
    },
    {
      type: 'input',
      message: 'Type in your id number:',
      name: 'id'
    },
    {
      type: 'input',
      message: 'Type in your email address',
      name: 'email'
    },
    {
      type: 'input',
      message: 'Type in the school you are attending',
      name: 'school'
    },
    {
      type: 'list',
      message: 'Would you like to add another team member?',
      choices: ['Engineer', 'Intern', 'No'],
      name: 'newMember'
    },
  ])
    .then(function (intern) {
      console.log(intern)
      manager.interns.push(intern)
      if (intern.newMember === 'Engineer') {
        getEngineer()
      } else if (intern.newMember === 'Intern') {
        getIntern()
      } else if (intern.newMember === 'No') {
        console.log(manager)
        writeToFile("./dist/index.html", htmlTemplate(manager))
      }
    })
};