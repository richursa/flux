const options = {
  url: 'http://localhost:3000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  json: {},
};
const TO_DO_KEY = 'To-Do-Key';
const GET_TO_DO_LIST = 'getToDoList';
const ADD_TASK = 'addTask';
const TASK = 'task';
const TASK_COMPLETED = 'taskCompleted';
const GET_API_CALL_COUNT = 'getAPIcallCount';
const HELP = '--help';
module.exports = {
  options,
  TO_DO_KEY,
  GET_TO_DO_LIST,
  ADD_TASK,
  TASK,
  TASK_COMPLETED,
  GET_API_CALL_COUNT,
  HELP,
};
