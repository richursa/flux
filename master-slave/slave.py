import pika		#rabbitmq server
import os		#for invoking system commands
rabbitMqExchangeServer = 'localhost'		#rabbitmq exchage address
connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitMqExchangeServer))		#create connection object
channel = connection.channel()		#create a channel for communication with exchange server
rabbitMqQueue = 'hello'     #sample queue name
channel.queue_declare(queue=rabbitMqQueue)		#create queue if not already created
def worker(channel, method,properties,command):		#a worker function which is invoked each time a msg is received
	print "executing command " , command
	os.system(command)							#execute the recived msg note:- dangerous same as remote code execution
	channel.basic_ack(delivery_tag = method.delivery_tag)		#acknowledge the completion of given work
channel.basic_qos(prefetch_count = 1)		#typically each work is scheduled to consecutively to each worker 
											#if a particular work is very long that worker would be scheduled jobs again 
											#while other workers remain free to avoid this we specify to give each worker 
											#only one job at a time and the jobs to be distributed amongst the free workers
channel.basic_consume(worker,queue= rabbitMqQueue)
channel.start_consuming() #infinte loop
