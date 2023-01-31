const inquirer = require('inquirer');
const fs = require('fs');

//HTML template for profile generator
const htmlTemplate = ({ name, job, id, email, github, office, school }) =>
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
        <h2 class="lead">Positon: ${job}.</h2>
        <ul class="list-group">
          <li class="list-group-item">ID: ${id}</li>
          <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
          <li class="list-group-item">Github: <a href="https://github.com/${github}">${github}</a></li>
          <li class="list-group-item">Office Number: ${office}</li>
          <li class="list-group-item">School: ${school}</li>
        </ul>
      </div>
    </header>
  </body>
  </html>
`;

//Questions for manager
inquirer.prompt([
  {
    type: 'input',
    message: 'What is your name?',
    name: 'name'
  },

  {
    type: 'list',
    message: 'Are you the manager?',
    choices: ['Manager', 'Engineer', 'Intern'],
    name: 'job'
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
    console.log(answers);
    if (answers.newMember === 'Engineer') {
      getEngineer()
    } else if (answers.newMember === 'Intern') {
      getIntern()
    } else if (answers.newMember === 'No') {
      writeToFile("index.html", htmlTemplate(answers))
    }
  });

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
  inquirer.prompt ([
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

  .then(function(answers2){
    console.log(answers2)
    
  })
}

// Function to get the next Intern and ask the following prompt
function getIntern() {
  inquirer.prompt ([
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
}