const request = require('request');
const constant = require('./constants/constant');
var amqp = require('amqplib/callback_api')
amqp.connect('amqp://localhost',function(err , conn){
    conn.createChannel(function(err , channel){
        var queue = process.argv[3]+'-send'
        channel.assertQueue(queue,{durable:false})
        channel.consume(queue,function(msg){
        console.log(msg.content.toString())
        },{noAck:true})
    })
})

const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

function isAddTask(input) {
    return input === constant.ADD_TASK;
  }
  
  function isTaskCompleted(input) {
    return input === constant.TASK_COMPLETED;
  }
  
  function isGetApiCallCount(input) {
    return input === constant.GET_API_CALL_COUNT;
  }
  
  function isGetToDoList(input) {
    return input === constant.GET_TO_DO_LIST;
  }
  function isHelp(input) {
    return input === constant.HELP;
  }
while(true){
    readLine.question("enter the key ",(key)=>{
        try{
            readLine.question("valid commands are getToDoList , getAPIcallCount , addTask , taskCompleted",(input)=>{
                if(isGetToDoList(input)){
                    constant.options.headers[constant.TO_DO_KEY] = key;
                    constant.options.url += constant.GET_TO_DO_LIST;
                    request.get(constant.options, (error, response, body) => {
                        console.log('Task List:');
                        console.log(body);
                    });
                }
                
                else if(isAddTask(input)){
                    constant.options.headers[constant.TO_DO_KEY] = key
                    constant.options.url += constant.ADD_TASK;
                    readLine.question("enter the task ",(task)=>{
                        constant.options.json[constant.TASK] = task
                        request.post(constant.options, (error, response, body) => {
                            console.log(body);
                        });
                    })
                }
                
                else if(isGetApiCallCount(input)){
                    constant.options.headers[constant.TO_DO_KEY] = key;
                    constant.options.url += constant.GET_API_CALL_COUNT;
                    request.get(constant.options, (error, response, body) => {
                        console.log(body);
                    });
                }

                else if (isHelp(input)) {
                    throw ('valid commands are getToDoList , getAPIcallCount , addTask , taskCompleted');
                } 
                
                else {
                    throw ('invalid   type  --help for more info');
                }
            })
        }
        catch (err) {
            console.log(err);
        }
        readLine.close()

    }) 


}
