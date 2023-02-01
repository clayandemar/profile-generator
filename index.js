class Manager {
  constructor(){}
  name = "";
  id = "";
  email = "";
  github = "";
  office = "";
  engineers = [];
  interns = [];
  }
  
  class Engineer {
    constructor(){}
    name = "";
    id = "";
    email = "";
    github = "";
  }
  
  class Intern {
    constructor(){}
    name = "";
    id = "";
    email = "";
    school = "";
  }


const inquirer = require('inquirer');
const fs = require('fs');
var allMembers = new Manager();


function generateNewMembers() {
  console.log(allMembers);
  var allHtml = ""
  for (var i = 0; i < allMembers.engineers.length; i++) {
    allHtml += engineerTemplate(allMembers.engineers[i]);
  }   for (var i = 0; i < allMembers.interns.length; i++) {
    allHtml += internTemplate(allMembers.interns[i]);
  }
  return allHtml;
}

//HTML template for profile manager
const htmlTemplate = ({ name, id, email, github, office }) =>
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
        <h2 class="lead">Positon: Manager</h2>
        <ul class="list-group">
          <li class="list-group-item">ID: ${id}</li>
          <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
          <li class="list-group-item">Github: <a href="https://github.com/${github}" target="_blank">${github}</a></li>
          <li class="list-group-item">Office Number: ${office}</li>
        </ul>
      </div> 
      ${generateNewMembers()}
    </header>
  </body>
  </html>
`;

//HTML template for profile engineer
const engineerTemplate = ({ name, id, email, github }) =>
  `<div class="container">
<h1 class="display-4">${name}</h1>
<h2 class="lead">Positon: Engineer</h2>
<ul class="list-group">
  <li class="list-group-item">ID: ${id}</li>
  <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
  <li class="list-group-item">Github: <a href="https://github.com/${github}" target="_blank">${github}</a></li>
</ul>
</div>
`;

//HTML template for profile engineer
const internTemplate = ({ name, id, email, school }) =>
  `<div class="container">
<h1 class="display-4">${name}</h1>
<h2 class="lead">Positon: Intern</h2>
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
      message: 'Type in your GitHub username',
      name: 'github'
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
    allMembers = answers;
    allMembers.engineers = [];
    allMembers.interns = [];
    console.log(allMembers);
    if (allMembers.newMember === 'Engineer') {
      getEngineer()
    } else if (allMembers.newMember === 'Intern') {
      getIntern()
    } else if (allMembers.newMember === 'No') {
      writeToFile("./dist/index.html", htmlTemplate(allMembers))
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
      allMembers.engineers.push(engineer)
      if (engineer.newMember === 'Engineer') {
        getEngineer()
      } else if (engineer.newMember === 'Intern') {
        getIntern()
      } else if (engineer.newMember === 'No') {
        console.log(allMembers)
        writeToFile("./dist/index.html", htmlTemplate(allMembers))
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
      allMembers.interns.push(intern)
      if (intern.newMember === 'Engineer') {
        getEngineer()
      } else if (intern.newMember === 'Intern') {
        getIntern()
      } else if (intern.newMember === 'No') {
        console.log(allMembers)
        writeToFile("./dist/index.html", htmlTemplate(allMembers))
      }
    })
};