const express = require('express');
const user = require('../user');
const amqp = require('amqplib/callback_api')
const router = express.Router();
amqp.connect('amqp://localhost',function(err , conn){

    router.get('/getToDoList', (request, response) => { // return to do list when api requests with a valid key
      if (user.database[request.get('To-Do-Key')]) { // api key is stored in http header To-Do-key to comply with http standards
        response.end(user.database[request.get('To-Do-Key')].toDoList.toString()); // user details is mapped with key and details are sent to client
        user.incrementApiCalls(request.get('To-Do-Key'), user.database, 'getToDoList'); // increment the api call counter associated with user
      } else {
        response.end(`no user with key '${request.get('To-Do-Key')}'  found`);
      }
    });


    router.post('/addTask', (request, response) => { // add task to the user mapped with the specified key
      if (user.database[request.get('To-Do-Key')]) {
        try {
          user.addTask(request.get('To-Do-Key'), user.database, request.body.task);
          response.end(`task ${request.body.task} added`);

          conn.createChannel(function(err,channel){               //addtask to a queue
            let queue = request.get('To-Do-Key') //quename is defined as the key of the user
            channel.assertQueue(queue,{durable : false})
            channel.sendToQueue(queue , new Buffer(request.body.task))
          })

        } catch (err) {
          response.end('task already present');
        }
        user.incrementApiCalls(request.get('To-Do-Key'), user.database, 'addTask');
      } else {
        response.end(`no user with key '${request.get('To-Do-Key')}'  found`);
      }
    });

    router.post('/taskCompleted', (request, response) => { // delete task associated with the user mapped by the specified key
      if (user.database[request.get('To-Do-Key')]) {
        try {
          user.taskCompleted(request.get('To-Do-Key'), user.database, request.body.taskCompleted);
          response.end(`task ${request.body.taskCompleted} completed`);
        } catch (err) { // if task not present raise error
          response.end(err.toString());
        }
      } else {
        response.end(`no user with key '${request.get('To-Do-Key')}'  found`);
      }
    });

    router.get('/getAPIcallCount', (request, response) => { // get the total number of api calls performed by the user with the specified key
      // NOTE:- querying the number of api calls doesnt increase the API call count
      if (user.database[request.get('To-Do-Key')]) {
        response.send(user.database[request.get('To-Do-Key')].apiCalls);
      } else {
        response.end(`no user with key '${request.get('To-Do-Key')}'  found`);
      }
    });
})

module.exports = router;
