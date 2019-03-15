var amqp = require('amqplib/callback_api')
amqp.connect('amqp://localhost',function(err , conn){
    conn.createChannel(function(err , channel){
        var queue = 'hello';
        channel.assertQueue(queue,{durable:false})
        channel.consume(queue,function(msg){
           console.log(msg.content.toString());
        },{noAck:true})
    })
})