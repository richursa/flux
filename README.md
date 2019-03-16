
# flux

flux is a simple rabbitmq based api for scheduling tasks with different workers.

![flux architecture](https://raw.githubusercontent.com/richursa/flux/master/flux-architecture.jpeg)

# API CALLS::

API Key should be passed in header 'To-Do-Key' with every request from client.

# getToDoList (GET)

Returns the tasks left to complete .

Query sample

  

Endpoint:- 'hostname:3000/api/getToDoList'

  

# addTask (POST)

Add a task to the list

Endpoint:- 'hostname:3000/api/addTask'

json raw request:-

{

"task" : "enter a javascript query which will be evaluated by eval() at worker"

}    
javascript query should be blocking and synchronous or task completed acknowledgement will be received before actually completing the task

  

# getAPIcallCount (GET)

Query returns the individual list of api calls made

endpoint:- 'hostname:3000/api/getAPIcallCount'

  

# Usage

On terminal type

```bash

npm run start-server
```

to get the server running
To get workers running ( worker should be called for each api-key ) 
```bash
npm run start-worker-apikey
```

run 

```bash

node client.js --help

```
for a simple api test client

 sample :
 ```bash
 node client.js addTask richukey 'console.log("Hello World!")'
 ```
 NOTE: worker script should be running to receive acknowledgement.
 
