var amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost',function(err,conn){
    conn.createChannel(function(err,channel){
        var queue = 'hello';
        channel.assertQueue(queue,{durable:false}) // change to true ?
        channel.sendToQueue(queue,new Buffer('enthonnaade'))
        // channel close is a big pain 
        })
})