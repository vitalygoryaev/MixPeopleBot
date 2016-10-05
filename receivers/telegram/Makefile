IMAGE_NAME = telegram_receiver

build:
	docker build -t $(IMAGE_NAME) .

run:
	-docker rm -f $(IMAGE_NAME)
	-docker run -d --name $(IMAGE_NAME) --restart="always" \
	--link rabbit:rabbit \
	$(IMAGE_NAME)

bash:
	-docker exec -it $(IMAGE_NAME) bash