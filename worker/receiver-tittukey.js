var amqp = require('amqplib/callback_api')
const request = require('request');
const constant = require('../constants/constant');
const KEY = 'tittukey'
constant.options.url += constant.TASK_COMPLETED;

amqp.connect('amqp://localhost',function(err , conn){
    conn.createChannel(function(err , channel){
      var queue = KEY

      channel.assertQueue(queue,{durable:false})
      channel.consume(queue,function(msg){
      eval(msg.content.toString()); // NOTE :eval is evil : for dev purpose only

      constant.options.headers[constant.TO_DO_KEY] = KEY;
      
      constant.options.json[constant.TASK_COMPLETED] = msg.content.toString()
      request.post(constant.options, (error, response, body) => {
        console.log(body);
      });


      channel.assertQueue(queue+'-ack',{durable:false})   //durable true ?
      channel.sendToQueue(queue+'-ack',new Buffer(msg.content.toString()+" completed")) //TO-DO close channel after use

      },{noAck:true})
        
    })
})
