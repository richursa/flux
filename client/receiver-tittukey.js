var amqp = require('amqplib/callback_api')
const request = require('request');
const constant = require('../constants/constant');
const KEY = 'richukey'

amqp.connect('amqp://localhost',function(err , conn){
    conn.createChannel(function(err , channel){
      var queue = KEY

      channel.assertQueue(queue,{durable:false})
      channel.consume(queue,function(msg){
      eval(msg.content.toString()); // NOTE :eval is evil : for dev purpose only

      constant.options.headers[constant.TO_DO_KEY] = KEY;
      constant.options.url += constant.TASK_COMPLETED;
      constant.options.json[constant.TASK_COMPLETED] = msg.content.toString()
      request.post(constant.options, (error, response, body) => {
        console.log(body);
      });


      channel.assertQueue(queue+'-send',{durable:false})   //durable true ?
      channel.sendToQueue(queue+'-send',new Buffer(msg.content.toString()+" completed")) //TO-DO close channel after use

      },{noAck:true})
        
    })
})