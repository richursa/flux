var amqp = require('amqplib/callback_api')
amqp.connect('amqp://localhost',function(err , conn){
    conn.createChannel(function(err , channel){
        var queue = 'tittukey';
        channel.assertQueue(queue,{durable:false})
        channel.consume(queue,function(msg){
        console.log(msg.content.toString())
        //eval(msg.content.toString()); // NOTE :eval is evil : for dev purpose only
        },{noAck:true})
    })
})
