IMAGE_NAME = rabbit

run:
	-docker rm -f $(IMAGE_NAME)
	-docker run -d --hostname $(IMAGE_NAME) --name $(IMAGE_NAME) \
	-e RABBITMQ_DEFAULT_USER=worker -e RABBITMQ_DEFAULT_PASS=workwork \
	-p 4369:4369 \
	-p 5671:5671 \
	-p 5672:5672 \
	-p 15671:15671 \
	-p 15672:15672 \
	-p 25672:25672 \
	rabbitmq:3-management