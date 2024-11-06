const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const database_path = './database/tasks.json';

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static('static'));
app.use(express.json());

// Database I/O functions:
function read_database(path_to_database = database_path, format = 'utf8') {
    return JSON.parse(fs.readFileSync(path_to_database, format))
}

function write_to_database(path_to_database = database_path, new_data, format = 'utf8') {
    fs.writeFileSync(path_to_database, JSON.stringify(new_data, null, 2), format)
}

function update_database(task, complete, path_to_database = database_path) {
    let new_data = {
        'current': task,
        'completed': complete
    }
    write_to_database(path_to_database, new_data)
}

// Update the local-state variables to that of the JSON database
let initial_data = read_database(database_path);
var task = initial_data.current;
var complete = initial_data.completed;

//post route for adding new task 
app.post("/addtask", function (req, res) {
    var newTask = req.body.newtask;
    task.push(newTask);
    update_database(task, complete);
    res.redirect("/");
});

//post route for removing a task
app.post("/removetask", function (req, res) {
    var completeTask = req.body.check;
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    update_database(task, complete);
    res.redirect("/");
});

//get route to default homepage
app.get('/', (req, res) => {
    data = {
        task: task,
        complete: complete,
        current_task: "sample task" //TODO: Change to a function update from ML model
    }
    res.render('home', data);
});

//get route to tasks/events history page
app.get('/history', (req, res) => {
    data = {
        task: task,
        complete: complete
    }
    res.render('history', data);
});

const port = 3000
app.listen(port, () => console.log(`This app is listening on port ${port}`));