import pika		#rabbitmq server
import os		#for invoking system commands
rabbitMqExchangeServer = 'localhost'		#rabbitmq exchage address
connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitMqExchangeServer))		#create connection object
channel = connection.channel()		#create a channel for communication with exchange server
rabbitMqQueue = 'hello'     #sample queue name
channel.queue_declare(queue=rabbitMqQueue)		#create queue if not already created
def worker(ch , method,properties,command):		#a worker function which is invoked each time a msg is received
	print "executing command " , command
	os.system(command)							#execute the recived msg note:- dangerous same as remote code execution
channel.basic_consume(worker,queue= rabbitMqQueue,no_ack = True)
channel.start_consuming() #infinte loop