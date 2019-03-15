import pika             #rabbitmq library
rabbitMqExchangeServer = 'localhost'        #rabbitmq exchange server for development purpose only
connection = pika.BlockingConnection(pika.ConnectionParameters(rabbitMqExchangeServer))        #create a connection object which is should be connected to rabbitmq server
channel = connection.channel()      #create a channel object
rabbitMqQueue = 'hello'     #sample queue name
channel.queue_declare(queue=rabbitMqQueue)        #define which rabbitMq queue to use 
#always true loop for dev purpose
while(1):
    inputString = raw_input() 
    channel.basic_publish(exchange='' ,routing_key = rabbitMqQueue, body = inputString)     #exchange server '' ? send a msg to queue 
    print inputString , "sent"
connection.close()
