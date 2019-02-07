import pika  #rabbitmq library 
rabbitMqExchangeServer = 'localhost'
connection = pika.BlockingConnection(pika.ConnectionParameters(rabbitMqExchangeServer))
channel = connection.channel()
rabbitMqQueue = 'hello'
channel.queue_declare(queue=rabbitMqQueue)
while(1):
    print 'enter the command to execute on slaves'
    command = raw_input()
    channel.basic_publish(exchange = '', routing_key = rabbitMqQueue , body = command)
    print command, ' sent'
connection.close()