IMAGE_NAME = telegram_receiver

run:
	-rm -r lib
	cp -r ../../lib ./lib
	docker build -t $(IMAGE_NAME) .
	-rm -r lib
	-docker rm -f $(IMAGE_NAME)
	-docker run -d --name $(IMAGE_NAME) --restart="always" \
	--link rabbit:rabbit \
	$(IMAGE_NAME)

bash:
	-docker exec -it $(IMAGE_NAME) bash
