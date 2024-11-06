const fs = require('fs');

function read_database(path, format = 'utf8') {
    return JSON.parse(fs.readFileSync(path, format))
}

function write_to_database(path, new_data, format = 'utf8') {
    fs.writeFileSync(path, JSON.stringify(new_data, null, 2), format)
}

const database_path = './database/tasks.json'

let initial_data = read_database(database_path)

// TODO: Add function to update the variables from JSON
//placeholders for added task
var task = initial_data.current;
//placeholders for removed task
var completed = initial_data.completed;
console.log('Current: \n', task)
console.log('Completed: \n', completed)