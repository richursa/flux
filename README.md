# TO-DO_js
TO-DO_js is a simple to-do task app built with NodeJS.
# API CALLS::
API Key  should be passed in header 'To-Do-Key' with every request
# getToDoList (GET)
returns the tasks left to complete .        
query sample        

endpoint:- 'hostname:3000/api/getToDoList'      

# addTask (POST)
Add a task to the list            
endpoint:- 'hostname:3000/api/addTask'      
json raw request:-      
{             
    "task"  : "taskToBeAdded"       
}       

# taskCompleted (POST)
Removes a task from the list        
endpoint:- 'hostname:3000/api/taskCompleted'        
json raw request:-      
{              
    "taskCompleted"  : "taskToBeRemoved"        
}       

# getAPIcallCount (GET) 
Query returns the individual list of api calls made     
endpoint:- 'hostname:3000/api/getAPIcallCount'      

# Usage 
On terminal type
```bash
        node app.js
```
to get the server running    

run  
```bash
node client.js --help 
```    

for a simple api test client


