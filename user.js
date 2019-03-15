const fs = require('fs'); // file system library for reading and writing into database file
const util = require('util');
var database = require('./database/database.json'); // temporary database of user information

function addTask(key, database, task) { // add a task to the user with the specified key
  if (database[key].toDoList.indexOf(task) != -1) {
    throw 'task already present';
  }
  database[key].toDoList.push(task);
}

function removeArrayElement(array, value) {
  const index = array.indexOf(value);
  if (index != -1) {
    array.splice(index, 1);
  } else {
    throw 'task not present';
  }
}

function taskCompleted(key, database, task) { // remove task from the user with the specified key
  removeArrayElement(database[key].toDoList, task);
}

function incrementApiCalls(key, database, api) { // increment the api call counter associaited with the current
  // api call and also increment total api call counter
  database[key].apiCalls[api]++;
  database[key].apiCalls.totalApiCalls++;
}

function writeDatabase(jsonFile, database) { // write the database back to the file
  fs.writeFileSync(jsonFile, JSON.stringify(database,null,"\t"), 'utf8');
}

setInterval(() => { // write to db to file every 10 seconds
  // temporary hack
  // TO-DO: learn mongoDb
  util.log('writing asynchronously to database');
  writeDatabase('./database/database.json', database);
  util.log('write completed');
}, 10000);


module.exports = {
  database,
  addTask,
  taskCompleted,
  writeDatabase,
  incrementApiCalls,
};
