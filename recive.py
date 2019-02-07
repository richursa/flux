import pika
rabbitMqExchangeServer = 'localhost'
connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitMqExchangeServer))
channel = connection.channel()
rabbitMqQueue = 'hello'     #sample queue name
channel.queue_declare(queue=rabbitMqQueue)
def callback(ch , method,properties,body):
	print "recived " , body
channel.basic_consume(callback,queue= rabbitMqQueue,no_ack = True)
channel.start_consuming()
